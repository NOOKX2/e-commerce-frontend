'use client';

import FormField from "@/components/checkout/FormField"
import StripeWrapper from "./StripeWrapper"
import { useState } from "react";
import { FormData } from "@/types/formData";
import useLocalStorage from "@/hooks/useLocalStorage";

const CACHE_KEY = 'checkoutFormData';

const checkoutFormData: FormData = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLine1: "",
    subDistrict: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
}

function CheckoutForm() {
    const [formData, setFormData] = useLocalStorage<FormData> (CACHE_KEY, checkoutFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    const shippingDataObject = {

        email: formData.email,
        receiverName: `${formData.firstName} ${formData.lastName}`,
        phoneNumber: formData.phoneNumber,
        streetAddress: formData.addressLine1,
        subDistrict: formData.subDistrict,
        district: formData.district,
        province: formData.province,
        postalCode: formData.postalCode,


    }

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4">Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="firstName"
                        label="First Name"
                        placeholder="Your First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <FormField
                        name="lastName"
                        label="Last Name"
                        placeholder="Your Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-4">
                    <FormField
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        placeholder="012-345-6789"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-4 space-y-4">
                    <FormField
                        name="addressLine1"
                        label="Address"
                        placeholder="House No., Building, Soi, Road"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="subDistrict"
                            label="Sub-district / Khwaeng"
                            placeholder="Klong Toei"
                            value={formData.subDistrict}
                            onChange={handleInputChange}
                        />
                        <FormField
                            name="district"
                            label="District / Khet"
                            placeholder="Klong Toei"
                            value={formData.district}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="province"
                            label="Province"
                            placeholder="Bangkok"
                            value={formData.province}
                            onChange={handleInputChange}
                        />
                        <FormField
                            name="postalCode"
                            label="Postal Code"
                            placeholder="10110"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4">Payment</h2>
                <StripeWrapper shippingAddress={shippingDataObject} />
            </section>
        </div>
    )
}

export default CheckoutForm
