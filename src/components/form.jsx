import { useState } from 'react';


function PaymentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    billaddress: '',
    shippingaddress:'',
    phoneNumber: '',
    amount: "10000",
    gst: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.billaddress.trim()) {
      errors.billaddress = 'Billing Address is required';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number is invalid';
    }
    if (!formData.amount.trim()) {
      errors.amount = 'Amount is required';
    }
    setErrors(errors);

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      fetch('http://192.168.29.70:8000/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert('Payment successful!');
        })
        .catch((error) => {
          console.error('There was a problem with your fetch operation:', error);
          alert('Payment failed. Please try again later.');
        });
    }
  };

  return (
    // <div className="flex flex-col md:flex-row justify-around items-center h-screen bg-gray-900">

    <div className="flex flex-col md:flex-row justify-around items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md">
        <form id="paymentForm" onSubmit={handleSubmit}>
          <div className="input-container flex items-center">
            <i className="fas fa-user text-gray-500 mr-2"></i>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleChange}
              className={`border rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80 ${errors.name ? 'border-red-500' : 'border-black'}`}
            />
          </div>
          {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
          <div className="input-container flex items-center mt-4">
            <i className="fas fa-envelope text-gray-500 mr-2"></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className={`border rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80 ${errors.email ? 'border-red-500' : 'border-black'}`}
            />
          </div>
          {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
          <div className="input-container flex items-center mt-4">
            <i className="fas fa-address-card text-gray-500 mr-2"></i>
            <input
              type="text"
              id="billaddress"
              name="billaddress"
              placeholder="Billing Address *"
              value={formData.billaddress}
              onChange={handleChange}
              className={`border rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80 ${errors.billaddress ? 'border-red-500' : 'border-black'}`}
            />
          </div>
          {errors.billaddress && <div className="text-red-500 mt-1">{errors.billaddress}</div>}
          <div className="input-container flex items-center mt-4">
            <i className="fas fa-address-card text-gray-500 mr-2"></i>
            <input
              type="text"
              id="shippingaddress"
              name="shippingaddress"
              placeholder="Shipping Address *"
              value={formData.shippingaddress}
              onChange={handleChange}
              className={`border rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80 ${errors.shippingaddress ? 'border-red-500' : 'border-black'}`}
            />
          </div>
          {errors.shippingaddress && <div className="text-red-500 mt-1">{errors.shippingaddress}</div>}
          <div className="input-container flex items-center mt-4">
            <i className="fas fa-phone text-gray-500 mr-2"></i>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number *"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`border rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80 ${errors.phoneNumber ? 'border-red-500' : 'border-black'}`}
            />
          </div>
          {errors.phoneNumber && <div className="text-red-500 mt-1">{errors.phoneNumber}</div>}
          <div className="input-container flex items-center mt-4">
            <i className="fas fa-money-bill text-gray-500 mr-2"></i>
            <input
              type="text"
              id="amount"
              name="amount"
              disabled
              placeholder="₹.10000"
              value={formData.amount}
              onChange={handleChange}
              className={`border rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80 ${errors.amount ? 'border-red-500' : 'border-black'}`}
            />
          </div>
          {errors.amount && <div className="text-red-500 mt-1">{errors.amount}</div>}
          <div className="input-container flex items-center mt-4">
            <i className="fas fa-id-card text-gray-500 mr-2"></i>
            <input
              type="text"
              id="gst"
              name="gst"
              placeholder="GST Number (Optional)"
              value={formData.gst}
              onChange={handleChange}
              className="border border-black rounded-lg py-2 px-4 focus:outline-none focus:border-black w-80"
            />
          </div>
          <div className="input-container mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Pay
            </button>
          </div>
        </form>
      </div>
      <div className="qr-container mt-5 bg-gray-800 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
        <img
          className="qr-code w-48 h-48"
          src="https://images.ctfassets.net/lzny33ho1g45/6TK1TbLNZQ4iHr0PjdZS2Y/ffb5c5646b914435f10b085b012bc78d/zap-qr-1.png?w=1400"
          alt="QR Code"
        />
        <p className="qr-text text-white mt-4">
          Please scan the above QR Code for the payment,<br />
          after the payment kindly send the screenshot to admin@voila.in
        </p>
      </div>
    </div>
  );
}

export default PaymentForm;
