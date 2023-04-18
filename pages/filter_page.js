import { useEffect, useState } from "react"

export default function Filter() {

    const [sizes, setsize] = useState([])
    const [categorys, setsubcategory] = useState([])
    const [items, setitems] = useState([])
    const [selecteditems, setselecteditems] = useState([])
    const [cartitems, setcartitems] = useState([])
    const [condition, setcondition] = useState({ category_id: 4, size_id: 2 })
    const [isLoading, setLoading] = useState(false)
    // console.log(sizes)
    useEffect(() => {

        apicalling()
        selingitem()
        setTimeout(() => {
            btn.click();
        }, 1000)
    }, [])



    function selingitem_size(data) {
        //  console.log(condition)
        let newArray = items.filter((el) => {
            return el.size_id == data && el.subcategory_id == condition.category_id

        });
        setselecteditems(newArray);
        setcondition((old) => ({ ...old, size_id: parseInt(data) }));
        console.log(condition);
    }

    function selingitem_type(data) {
        //  console.log(condition)
        let newArray = items.filter((el) => {
            return el.size_id == condition.size_id && el.subcategory_id == data
        });
        setselecteditems(newArray);
        setcondition((old) => ({ ...old, category_id: parseInt(data) })); console.log(condition);
    }

    async function apicalling() {
        fetch('https://espsofttech.org:6019/api/getsize', { method: "POST" }).then((res) => res.json()).then((data) => {
            setsize(data.data)
        });
        fetch('https://espsofttech.org:6019/api/getAllSubcategories').then((res) => res.json()).then((data) => {
            setsubcategory(data.data)
        });
        fetch('https://espsofttech.org:6019/api/getAllItemByFilter').then((res) => res.json()).then((data) => {
            // console.log(data.data)
            setitems(data.data)
        })



    }

    function selingitem() {
        // console.log(condition)
        let newArray = items.filter((el) => {
            return el.size_id == condition.size_id && el.subcategory_id == condition.category_id

        });
        setselecteditems(newArray);
    }

    console.log(selecteditems)
    //console.log(selecteditems);
    // console.log(sizes, categorys, items)
    return (
        <>
            <div >
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <select class="form-select" aria-label="Default select example" onClick={(e) => { selingitem_size(e.target.value) }}>
                                {sizes.map((e) => {
                                    return (
                                        <option value={e.id} selected={2 == e.id ? true : false}>{e.size_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div class="col">
                            <select class="form-select" aria-label="Default select example" onClick={(e) => { selingitem_type(e.target.value) }}>
                                {categorys.map((e) => {
                                    return (
                                        <option value={e.id} selected={4 == e.id ? true : false}>{e.sub_category_name}</option>
                                    );
                                })}
                            </select>
                        </div><hr></hr>
                        <div class="card">
                            <div class="card-body"><h4>View list</h4>
                                <button id="btn" style={{ display: 'none' }} onClick={() => selingitem()}>start</button>
                                <div class="col container-fluid">

                                    {selecteditems.map((e) => {
                                        return (
                                            
                                            <input type='image' id={e.item_id} value={e.item_id
                                            } onClick={() => {cartitems.includes(e) == false? setcartitems((old) => [...old, e])
                                                : console.log(cartitems)  }} src={'https://espsofttech.org/forensic/backend/uploads/' + e.image} width='70px' ></input>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <hr></hr>
                        <div class="card">
                            <div class="card-body"><h4>Cart</h4>
                                {cartitems.map((e) => {
                                    return (
                                        <input type='image' id={e.item_id} value={e.item_id
                                        } src={'https://espsofttech.org/forensic/backend/uploads/' + e.image} width='70px' ></input>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}