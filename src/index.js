import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/tabs.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";


// const App = () => {
//     return (
//         <div className="flex flex-col w-[500px]   h-screen overflow-auto  m-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg ">
//             <Header />
//             <div className=" overflow-y-auto flex-grow ">
//                 <Routes>
//                     <Route path="/activities" element={<App />} />
//                     <Route path="/activities/:callId" element={<CallDetails />} />
//                     <Route path="/" element={<Body />} />
//                 </Routes>
//             </div>
//             <Footer />
//         </div>

//     )
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
