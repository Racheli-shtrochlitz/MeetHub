
import { AutoComplete } from "primereact/autocomplete";

// import { AutoComplete } from "primereact/autocomplete";

import { Calendar } from "primereact/calendar";

import { Checkbox } from "primereact/checkbox";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function BasicDemo() {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    const [datetime24h, setDateTime24h] = useState(null);
    const [time, setTime] = useState(null);
    // put student list from 
    const search = (event) => {
        let _items = [...Array(10).keys()];
        setItems(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
    }

    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="add lesson" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="add lesson" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="card flex flex-wrap gap-3 p-fluid">

                    <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="font-bold block mb-2">
                            student
                        </label>
                        <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown showIcon />
                    </div>
                    <div className="flex-auto">
                        <span className="p-float-label" >
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                subject
                            </label>
                            <AutoComplete inputId="ac" value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} showIcon />
                        </span>
                    </div>
                    <div className="flex-auto">
                        <span className="p-float-label" >
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                data and time
                            </label>
                            <Calendar value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24" showIcon />
                        </span>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox inputId="ingredient1" name="pizza" value="recorde" onChange={()=>{}} checked={()=>{}} />
                        <label className="ml-2">recording</label>
                    </div>
                    <div className="flex-auto">
                        <span className="p-float-label" >
                        <Button label="upload" icon="pi pi-external-link" onClick={() => navigate('/upload')} />
                        <label className="ml-2">upload</label>
                        </span>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}



// import React, { useState } from "react";
// import { Checkbox } from "primereact/checkbox";

// export default function GroupDemo() {
//     const [ingredients, setIngredients] = useState([]);

//     const onIngredientsChange = (e) => {
//         let _ingredients = [...ingredients];

//         if (e.checked)
//             _ingredients.push(e.value);
//         else
//             _ingredients.splice(_ingredients.indexOf(e.value), 1);

//         setIngredients(_ingredients);
//     }

//     return (
//         <div className="card flex flex-wrap justify-content-center gap-3">
//             <div className="flex align-items-center">
//                 <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
//                 <label htmlFor="ingredient1" className="ml-2">Cheese</label>
//             </div>
//             <div className="flex align-items-center">
//                 <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={onIngredientsChange} checked={ingredients.includes('Mushroom')} />
//                 <label htmlFor="ingredient2" className="ml-2">Mushroom</label>
//             </div>
//             <div className="flex align-items-center">
//                 <Checkbox inputId="ingredient3" name="pizza" value="Pepper" onChange={onIngredientsChange} checked={ingredients.includes('Pepper')} />
//                 <label htmlFor="ingredient3" className="ml-2">Pepper</label>
//             </div>
//             <div className="flex align-items-center">
//                 <Checkbox inputId="ingredient4" name="pizza" value="Onion" onChange={onIngredientsChange} checked={ingredients.includes('Onion')} />
//                 <label htmlFor="ingredient4" className="ml-2">Onion</label>
//             </div>
//         </div>
//     )
// }

