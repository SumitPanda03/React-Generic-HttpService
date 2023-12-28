import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// interface FormData{
//     name: string
//     age: number
// }


const Form = () => {
  //Form input handling using useRef hook
  // const nameRef = useRef<HTMLInputElement>(null)
  // const ageRef = useRef<HTMLInputElement>(null)

  // const Person = { name:'',age:0}

  // const handleSubmit = (event:FormEvent) => {
  //     event.preventDefault()
  //     if(nameRef.current !== null)
  //         Person.name = (nameRef.current.value)
  //     if(ageRef.current !== null)
  //         Person.age = parseInt(ageRef.current.value)
  //     console.log(Person);
  // }

  //Form Input handling using useState Hook

  // const[Person,setPerson] = useState({name:'',age:''})

  // const handleSubmit = (event:FormEvent) => {
  //     event.preventDefault()
  //     console.log(Person);

  // }

  //Form handling using react-hook-form and ZOD

  const schema = z.object({
    name: z.string().min(3, { message: " Name must be atleast 3 characters" }),
    age: z.number({ invalid_type_error: " Age field is required" }).min(18),
  });
  
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />

          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age")}
            id="age"
            type="number"
            className="form-control"
          />

          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <button disabled={!isValid} className=" btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default Form;
