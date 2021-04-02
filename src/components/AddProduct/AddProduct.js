
import React, { useState } from 'react';
import './AddProduct.css';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddProduct = () => {

    const { register, handleSubmit } = useForm();

    const [imageUrl, setImageUrl] = useState(null)

    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', '02ecc9ae74794902104116f47bebd708')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmit = data => {
        const newProduct = { ...data, product_imgUrl: imageUrl }
        fetch('https://the-daily-shop-server.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Product Successfully Added')
                }
            })
    };

    return (
        <div className="add-product-container">
            <h1 className="add-product-title">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="from-box">
                    <div className="add-product-box">
                        <div className="row">
                            <label className="col-6 mb-3" htmlFor="product_name">
                                <h5>Product Name</h5>
                                <input className="d-block w-100 p-2 form-control" name="product_name" id="product_name" type="text" placeholder="Type here" ref={register({ required: true })} />
                            </label>
                            <label className="col-6 mb-3" htmlFor="product_wight">
                                <h5>Product Wight</h5>
                                <input className="d-block w-100 p-2 form-control" name="product_wight" id="product_wight" type="text" placeholder="Type here" ref={register({ required: true })} />
                            </label>
                        </div>
                        <div className="row">
                            <label className="col-6 mb-3" htmlFor="product_price">
                                <h5>Add Price</h5>
                                <input className="d-block w-100 p-2 form-control" name="product_price" id="product_price" type="text" placeholder="Type here" ref={register({ required: true })} />
                            </label>
                            <label className="col-6 mb-3" htmlFor="product_imgUrl">
                                <h5>Add Photo</h5>
                                <input className="d-block w-100 p-2" id="product_imgUrl" type="file" placeholder="Upload Photo" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                    <div className="save-btn-box text-right mr-3 mt-3">
                        <input className="btn my-btn save-btn" type="submit" value="Save Product" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;