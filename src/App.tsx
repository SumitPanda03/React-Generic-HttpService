// import ListGroup from "./components/ListGroup"
// import { useState } from "react"
// import Navbar from "./components/Navbar"
// import Cart from "./components/Cart"

import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

// import { useState } from "react";
// import ExpenseList from "./expense-tracker/components/ExpenseList";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
// import ExpenseForm from "./expense-tracker/components/ExpenseForm";
// import categories from "./expense-tracker/categories";

// function App(){
//   const items = ["Apple", "Banana", "Orange", "Melons"];
//   const handleSelectItem = (item:string) => {console.log(item)}

//   return <div><ListGroup items={items} heading = "Cities" onSelectItem={handleSelectItem}/></div>
// }

// export default App

//Passing Children in Props
// import Alert from "./components/Alert";

// function App(){

//   return (
//   <div>
//     <Alert>
//       <h1>Hello</h1> World
//     </Alert>
//   </div>
//   )
// }

// export default App

// import Button from "./components/Button"
// import Alert from "./components/Alert"
// import { useState } from "react"

// function App(){
//   const [alertVisible, setAlertVisiblity] = useState(false)

//   return (
//   <div>
//     {alertVisible === false ? null: <Alert onClose={()=> setAlertVisiblity(false)}> Alert</Alert>}
//     {/* {alertVisible && <Alert> Alert</Alert>} */}

//     <Button onClick={() =>
//         setAlertVisiblity(true)
//         // console.log('Clicked')
//       }>
//       My Button
//     </Button>
//   </div>
//   )
// }

// export default App

// function App(){
//   const [cartItems, setCartItems] = useState(['Product1','Product2'])

//   return (
//     <>
//       <div>
//           <Navbar cartItemsCount={cartItems.length}/>
//           <Cart cartItems={cartItems} onClear={() => setCartItems([])}/>
//       </div>
//     </>
//   )
// }

// export default App

// function App() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [expenses, setExpenses] = useState([
//     { id: 1, description: "A", amount: 100, category: "Utilities" },
//     { id: 2, description: "B", amount: 200, category: "Entertainment" },
//     { id: 3, description: "C", amount: 300, category: "Groceries" },
//     { id: 4, description: "D", amount: 400, category: "Utilities" },
//   ]);

//   const visibleExpenses = selectedCategory
//     ? expenses.filter((e) => e.category === selectedCategory)
//     : expenses;

//   return (
//     <>
//       <div>
//         <div className="mb-5">
//           <ExpenseForm
//             onSubmit={(expense) =>
//               setExpenses([
//                 ...expenses,
//                 { ...expense, id: expenses.length + 1 },
//               ])
//             }
//           />
//         </div>
//         <div className="mb-3">
//           <ExpenseFilter
//             onSelectCategory={(category) => setSelectedCategory(category)}
//           />
//         </div>
//         <ExpenseList
//           expenses={visibleExpenses}
//           onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
//         />
//       </div>
//     </>
//   );
// }

// export default App;

// function App() {
//   const [category, setCatergory] = useState("");
//   return (
//     <>
//       <div>
//         <select
//           className="form-select"
//           onChange={(event) => setCatergory(event.target.value)}
//         >
//           <option value=""></option>
//           <option value="Clothing">Clothing</option>
//           <option value="Household">Household</option>
//         </select>
//         <ProductList category={category} />
//       </div>
//     </>
//   );
// }


import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";


function App() {
    // const [users, setUsers] = useState<User[]>([]);
    // const [error, setError] = useState("");
    // const [isLoading, setIsLoading] = useState(false);

    const {users, error, isLoading, setError, setUsers, setIsLoading} = useUsers()

    //Another way to do the same but in async-await fashion --> complex

    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try{
    //       const res = await axios
    //       .get<User[]>("https://jsonplaceholder.typicode.com/users")
    //       setUsers(res.data)
    //     }catch(err){
    //       setError((err as AxiosError).message)
    //     }
    //   }
    //   fetchUsers()
    // }, []);


    //Simpler way to extract the get method and promise and handle error

    useEffect(() => {
        setIsLoading(true);
        const { request, cancel } = userService.getAll<User>();
        request
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setIsLoading(false);
            });

        // .then((res) => console.log(res.data[0].name));
        // .catch((error) => console.log(error));

        // .finally(() => {
        //   setIsLoading(false)
        // }) // use it only with the try block

        return () => cancel();
    }, []);


    const deleteUser = (user: User) => {
        const originalUsers = [...users];
        setUsers(users.filter((u) => u.id !== user.id));

        userService.delete(user.id).catch((err) => {
            setError(err.message);
            setUsers(originalUsers);
        });
    };

    const addUser = () => {
        const originalUsers = [...users];
        const newUser = { id: 0, name: "Sumit" };
        setUsers([newUser, ...users]);

        userService
            .create(newUser)
            // .then((res) => setUsers([res.data, ...users]));
            .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
            .catch((err) => {
                setError(err.message);
                setUsers(originalUsers);
            });
    };

    const updateUser = (user: User) => {
        const originalUsers = [...users];
        const updatedUser = { ...user, name: user.name + "!" };
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

        userService.update(updatedUser).catch((err) => {
            setError(err.message);
            setUsers(originalUsers);
        });
    };

    return (
        <>
            {error && <p className="text-danger">{error}</p>}
            {isLoading && <div className="spinner-border"></div>}
            <div>
                <button className="btn mb-3 btn-primary" onClick={addUser}>
                    Add
                </button>
                <ul className="list-group">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="list-group-item d-flex justify-content-between"
                        >
                            {user.id} : {user.name}
                            <div>
                                <button
                                    className="btn btn-outline-secondary mx-1"
                                    onClick={() => updateUser(user)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteUser(user)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
