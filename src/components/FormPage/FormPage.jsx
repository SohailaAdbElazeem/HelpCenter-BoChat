import React, { useState } from 'react';

export default function FormPage() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    setShowToast(true);

    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        paddingBottom: '120px',
        marginBottom: '200px'
      }}
    >
      <div className="w-100" style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Title */}
        <div className="text-center mb-5">
          <h2 style={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 600,
            fontSize: '85px',
            lineHeight: '140%',
            color: '#FFFFFF',
            marginBottom: '60px',
            textAlign: 'center',
          }}>
            إرسال طلب
          </h2>
        </div>

        <form className="mx-auto" style={{ maxWidth: '1033px' }}>

          {/* Email */}
          <div className="mb-4">
            <label 
              htmlFor="email"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                color: '#000000',
                display: 'block',
                textAlign: 'right',
                marginBottom: '12px'
              }}
            >
              عنوان بريدك الالكتروني
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="form-control"
              style={{
                width: '100%',
                height: '60px',
                borderRadius: '22px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: 'none',
                padding: '0 25px',
                fontSize: '18px',
                textAlign: 'right'
              }}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label 
              htmlFor="address"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                color: '#000000',
                display: 'block',
                textAlign: 'right',
                marginBottom: '12px'
              }}
            >
              العنوان
            </label>
            <input 
              type="text" 
              id="address" 
              name="address"
              className="form-control"
              style={{
                width: '100%',
                height: '60px',
                borderRadius: '22px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: 'none',
                padding: '0 25px',
                fontSize: '18px',
                textAlign: 'right'
              }}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label 
              htmlFor="desc"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                color: '#000000',
                display: 'block',
                textAlign: 'right',
              }}
            >
              الوصف
            </label>
            <p style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: '17px',
              color: '#333',
              textAlign: 'right',
              marginBottom: '30px'
            }}>
              يُرجى إدخال بيانات طلبك. سوف يستجيب عضو من فريق الدعم في أسرع وقت ممكن
            </p>
            <textarea 
              id="desc" 
              name="description"
              rows={8}
              className="form-control"
              style={{
                width: '100%',
                height: '412px',
                borderRadius: '22px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: 'none',
                padding: '25px',
                fontSize: '18px',
                textAlign: 'right',
                resize: 'none'
              }}
            />
          </div>

          {/* File Upload */}
          <div className="mb-5">
            <label 
              htmlFor="uploadFile"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                color: '#000000',
                display: 'block',
                textAlign: 'right',
                marginBottom: '12px'
              }}
            >
              مرفقات
            </label>

            <label 
              htmlFor="uploadFile"
              className="d-flex align-items-center justify-content-center text-center"
              style={{
                width: '1033px',
                height: '70px',
                borderRadius: '22px',
                background: '#FFFFFFE5',
                border: '1px dashed #00000080',
                backdropFilter: 'blur(15px)',
                cursor: 'pointer',
                fontFamily: "'Cairo', sans-serif",
                fontSize: '18px',
                color: '#666666',
                margin: '0 auto',
              }}
            >
              اختر ملفاً او قم بالسحب والاسقاط هنا
            </label>

            <input 
              type="file" 
              id="uploadFile" 
              name="uploadFile"
              style={{ display: 'none' }}
              onChange={(e) => console.log(e.target.files)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button
              type="button"
              style={{
                width: '400px',
                height: '60px',
                borderRadius: '20px',
                background: '#D72229',
                color: '#FFFFFF',
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                border: '1px',
                backgroundColor:"D72229",
                cursor: 'pointer',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 4px 15px rgba(215, 34, 41, 0.3)'
              }}
              onClick={handleSubmit}
            >
              إرسال طلب
            </button>
          </div>

        </form>

        {/* Success Toast - Top Right */}
 {showToast && (
  <div style={{
    position: 'fixed',
    top: '50px',
    right: '30px',
    zIndex: 9999,
  }}>
    <div style={{
      width: '270px',
      height: '50px',
      background: 'rgba(255, 255, 255, 0.70)',
      borderRadius: '17px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      fontFamily: "'Cairo', sans-serif",
      fontSize: '16px',
      fontWeight: 500,
      color: '#D72229',
      direction: 'rtl',
    }}>
      
      {/* زرار الإغلاق داخل دائرة - X في المنتصف */}
      <button
        onClick={() => setShowToast(false)}
        style={{
          width: '18px',
          height: '18px',
          background: 'none',
           color: '#D72229',
          border: '3px solid #D72229',
          borderRadius: '50%',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: '1',
          marginLeft: '14px',
          transition: 'all 0.2s ease',
           textAlign:"center",
          padding: 0,              
          boxSizing: 'border-box' , 
          paddingBottom: '1px'
        }}
// /        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b81c22'}
        // onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D72229'}
      >
        ×
      </button>

      {/* النص */}
      <div style={{ 
        flex: 1, 
        textAlign: 'right',
        paddingRight: '8px'
      }}>
        تم استلام طلبك بنجاح
      </div>

    </div>
  </div>
)}
      </div>
    </div>
  );
}