import React from 'react';
import "./FAQ.CSS";
import Search from '../Search/Search';

const questionsData = [
  { question: "في حال فقدت هاتفي كيف يمكنني استعادة حسابي دون المساس بخصوصية بياناتي القديمة؟" },
  { question: "كيف يمكنني تخصيص واجهة التطبيق لتناسب ذوقي الشخصي؟" },
  { question: "هل يستهلك التطبيق مساحة تخزين كبيرة أو يؤثر على أداء بطارية الهاتف؟" },
  { question: "كيف يمكنني دعوة أصدقائي للانضمام وتجربة الفصل الجديد معكم؟" },
  { question: "في حال فقدت هاتفي كيف يمكنني استعادة حسابي دون المساس بخصوصية بياناتي القديمة؟" },
  { question: "كيف يمكنني تخصيص واجهة التطبيق لتناسب ذوقي الشخصي؟" },
  { question: "هل يستهلك التطبيق مساحة تخزين كبيرة أو يؤثر على أداء بطارية الهاتف؟" },
  { question: "كيف يمكنني دعوة أصدقائي للانضمام وتجربة الفصل الجديد معكم؟" },
];

export default function FAQ() {
  return (
    <div>
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
              className="fw-bold mx-4"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: '65px',
                lineHeight: '45px',
                color: '#000000',
                margin: '90px 0 60px',
                maxWidth: '800px'
              }}
            >
              الأسئلة الشائعة
            </div>
          </div>

          {/* Questions Grid */}
          <div className="row gx-3 gy-3" style={{ marginBottom: '500px' }}>
            {questionsData.map((item, index) => (
              <div key={index} className="col-12">
                <div 
                  className="d-flex align-items-center px-5 shadow-sm"
                  style={{
                    width: '100%',
                    maxWidth: '1032px',
                    height: '60px',
                    background: '#EDEDED',
                    borderRadius: '28px',
                    margin: '0 auto',    
                  }}
                >
                  {/* Red Dot */}
                  <div 
                    className="bg-danger rounded-circle flex-shrink-0"
                    style={{ width: '15px', height: '15px' }}
                  ></div>

                  {/* Question Text */}
                  <span 
                    className="text-danger fw-semibold fs-5 flex-grow-1 text-end px-3"
                    style={{ 
                      fontFamily: "'Cairo', sans-serif",
                      lineHeight: '1.4'
                    }}
                  >
                    {item.question}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}