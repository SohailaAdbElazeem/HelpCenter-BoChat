import React from 'react'
import Search from '../Search/Search'
import { FaUserLock} from "react-icons/fa";
  import { CgSandClock } from "react-icons/cg";
import { MdFeaturedPlayList } from "react-icons/md";
 import "./JoinUs.css"
const boxesData = [
  {
    icon: <FaUserLock size={28}  />,
    header: " برنامج السفراء",
    text: "يمكنك دعوة أصدقائك او متابعينك باستخدام أكواد إحالة "
  },
  {
    icon: <CgSandClock size={28}  />,
    header: " استثمر معنا",
    text:"نستهدف الأشخاص الذي لديهم عقلية استثمارية ويرغبون في دعم بو شات"
  },
  {
    icon: <MdFeaturedPlayList size={28}  />,
    header: " المطورون والمساهمون",
    text: "دعوة المطورين للإبلاغ عن الثغرات الأمنية أو اقتراح ميزات برمجية جديدة."
  },
 
];
export default function JoinUs() {
  return (
    <div className='joinSec'>
      <h2 className='title'>انضم إلينا كشريك</h2>
      <p className='text-join'>كن جزءاً من رحلة بوشات سواء كنت مستخدماً وفياً يرغب في نشر رسالتنا أو مستثمراً يؤمن برؤيتنا في حماية الخصوصية نحن نفتح لك الأبواب لنبني المستقبل سوياً.</p>
      <Search/>
        <div className="boxes-section">
      {boxesData.map((box, index) => (
        <div className="box" key={index}>
          <div className="card">
            
            <div className="icon-box">{box.icon}</div>
            <h3>{box.header}</h3>
            <p>{box.text}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
