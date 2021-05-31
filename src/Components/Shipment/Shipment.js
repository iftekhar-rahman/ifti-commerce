import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';

    const Shipment = () => {
        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        const onSubmit = data => console.log(data);

        console.log(watch("example")); // watch input value by passing the name of it

        return (
            <section className="shipment-area pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h2 className="mb-4">Shipment Form</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row mb-3">
                                    <input name="name" className="form-control" {...register("name", { required: true })}  placeholder="Your Name"/>
                                    {errors.name && <span className="error">Name is required</span>}
                                </div>
                                <div className="form-row">
                                    <input name="email" className="form-control" {...register("email", { required: true })} placeholder="Your Email"/>
                                    {errors.email && <span className="error">Email is required</span>}
                                </div>
                                <input className="btn btn-danger mt-3 ps-4 px-4 pt-2 pb-2" type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
        );
        // return (
        //     <section className="shipment-area pt-5 pb-5">
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col">
        //                     <h2>Shipment</h2>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // );
};

export default Shipment;