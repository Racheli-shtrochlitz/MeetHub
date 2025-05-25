// import React from 'react';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Divider } from 'primereact/divider';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     // Handle newsletter subscription
//     console.log('Newsletter subscription submitted');
//   };

//   return (
//     <footer style={{backgroundColor:'black'}} className="bg-black-900 text-white">
//       {/* Newsletter Section */}
//       <div className="bg-blue-600 py-8">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="text-center md:text-left">
//               <h3 className="text-xl font-bold mb-2">Stay Updated with Learning Tips</h3>
//               <p className="text-blue-100">Get the latest educational content and platform updates delivered to your inbox.</p>
//             </div>
//             <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
//               <InputText 
//                 placeholder="Enter your email address" 
//                 className="w-64"
//                 style={{ borderRadius: '6px' }}
//               />
//               <Button 
//                 label="Subscribe" 
//                 icon="pi pi-send" 
//                 className="bg-white text-blue-600 border-white hover:bg-blue-50"
//                 style={{ whiteSpace: 'nowrap' }}
//               />
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <i className="pi pi-graduation-cap text-2xl text-blue-400"></i>
//               <h3 className="text-xl font-bold">EduConnect</h3>
//             </div>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               Connecting passionate teachers with eager students worldwide. 
//               Quality education made accessible through personalized online lessons.
//             </p>
//             <div className="flex gap-3">
//               <Button 
//                 icon="pi pi-facebook" 
//                 className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400"
//                 style={{ width: '2.5rem', height: '2.5rem' }}
//               />
//               <Button 
//                 icon="pi pi-twitter" 
//                 className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400"
//                 style={{ width: '2.5rem', height: '2.5rem' }}
//               />
//               <Button 
//                 icon="pi pi-linkedin" 
//                 className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400"
//                 style={{ width: '2.5rem', height: '2.5rem' }}
//               />
//               <Button 
//                 icon="pi pi-instagram" 
//                 className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400"
//                 style={{ width: '2.5rem', height: '2.5rem' }}
//               />
//             </div>
//           </div>

//           {/* For Students */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-blue-400">For Students</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Teachers</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Browse Subjects</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Book Trial Lessons</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Student Resources</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Learning Tips</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
//             </ul>
//           </div>

//           {/* For Teachers */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-blue-400">For Teachers</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Become a Teacher</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Teacher Dashboard</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Earnings & Payments</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Teaching Resources</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Professional Development</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Teacher Community</a></li>
//             </ul>
//           </div>

//           {/* Support & Company */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-blue-400">Support & Info</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety & Trust</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="mt-12 pt-8 border-t border-gray-700">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <i className="pi pi-shield text-green-400"></i>
//                 <span className="text-sm text-gray-300">SSL Secured</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <i className="pi pi-verified text-blue-400"></i>
//                 <span className="text-sm text-gray-300">Verified Teachers</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <i className="pi pi-heart text-red-400"></i>
//                 <span className="text-sm text-gray-300">Trusted by 10k+ Students</span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-300">Available on:</span>
//               <Button 
//                 icon="pi pi-apple" 
//                 className="p-button-text text-gray-300 hover:text-white"
//                 style={{ padding: '0.25rem' }}
//               />
//               <Button 
//                 icon="pi pi-android" 
//                 className="p-button-text text-gray-300 hover:text-white"
//                 style={{ padding: '0.25rem' }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Divider className="my-0" style={{ borderColor: '#374151' }} />

//       {/* Bottom Footer */}
//       <div className="bg-gray-800 py-4">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="text-sm text-gray-400">
//               © {currentYear} LearnConnect. All rights reserved.
//             </div>
            
//             <div className="flex items-center gap-6 text-sm">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-black">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="pi pi-graduation-cap text-lg text-blue-400"></i>
              <h3 className="text-lg font-bold text-white">EDUCONNECT</h3>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              חיבור מורים ותלמידים ברחבי העולם
            </p>
            <div className="flex gap-2">
              <Button 
                icon="pi pi-facebook" 
                className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400 cursor-pointer"
                style={{ width: '2rem', height: '2rem' }}
              />
              <Button 
                icon="pi pi-instagram" 
                className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400 cursor-pointer"
                style={{ width: '2rem', height: '2rem' }}
              />
              <Button 
                icon="pi pi-linkedin" 
                className="p-button-rounded p-button-text text-gray-300 hover:text-blue-400 cursor-pointer"
                style={{ width: '2rem', height: '2rem' }}
              />
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">לתלמידים</h4>
            <ul className="space-y-1 text-xs">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">חיפוש מורים</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">נושאי לימוד</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">שיעור ניסיון</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">משאבי למידה</a></li>
            </ul>
          </div>

          {/* For Teachers */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">למורים</h4>
            <ul className="space-y-1 text-xs">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">הצטרפות כמורה</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">לוח בקרה</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">רווחים ותשלומים</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">משאבי הוראה</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">תמיכה</h4>
            <ul className="space-y-1 text-xs">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">מרכז עזרה</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">צור קשר</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">איך זה עובד</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">אודותינו</a></li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-600">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <i className="pi pi-shield text-green-400"></i>
              <span className="text-gray-300">מאובטח SSL</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="pi pi-verified text-blue-400"></i>
              <span className="text-gray-300">מורים מאומתים</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300">זמין עבור:</span>
            <div className="flex gap-1">
              <Button 
                icon="pi pi-apple" 
                className="p-button-text text-gray-300 hover:text-white cursor-pointer"
                style={{ padding: '0.2rem', fontSize: '0.8rem' }}
              />
              <Button 
                icon="pi pi-android" 
                className="p-button-text text-gray-300 hover:text-white cursor-pointer"
                style={{ padding: '0.2rem', fontSize: '0.8rem' }}
              />
              <Button 
                icon="pi pi-microsoft" 
                className="p-button-text text-gray-300 hover:text-white cursor-pointer"
                style={{ padding: '0.2rem', fontSize: '0.8rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-0" style={{ borderColor: '#475569' }} />

      {/* Bottom Footer */}
      <div className="bg-slate-900 py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-400">
              © {currentYear} EDUCONNECT. כל הזכויות שמורות.
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">מדיניות פרטיות</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">תנאי שימוש</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">נגישות</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;