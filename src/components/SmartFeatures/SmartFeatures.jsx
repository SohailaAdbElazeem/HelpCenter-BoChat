 import React from 'react';
import Search from '../Search/Search';

const SmartFeatures = () => {
  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ 
        background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" 
      }}
    >
      <div className="w-100" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Search Component */}
        <Search />

        {/* Header - Big Title */}
        <div className="mb-5">
          <div 
            className="fw-bold"
            style={{
              // width: '709px',
              // height: '115px',
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: '65px',
              lineHeight: '45px',
              color: '#000000',
              margin:'90px 0 60px '
            }}
          >
            المميزات الذكية           </div>
        </div>

        {/* Buttons Grid - with large bottom space */}
        <div className="row g-2" style={{ marginBottom: '500px' }}>
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="col-12 col-md-6 d-flex ">
              <div 
                className="d-flex align-items-center px-4 shadow-sm"
                style={{
                  width: '509px',
                  // height: '70px',
                  height:"60px",
                  background: '#EDEDED',
                  borderRadius: '28px',
                  opacity: 1,
                }}
              >
                {/* Red Dot */}
                <div 
                  className="bg-danger rounded-circle flex-shrink-0"
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    // marginLeft: '6px' 
                    marginLeft: '0px' 

                  }}
                ></div>

                {/* Text */}
                <span 
                  className="text-danger fw-semibold fs-5 flex-grow-1 text-end px-3"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  إدارة حسابك
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SmartFeatures;