import { useState } from 'react'
export async function getServerSideProps(context) {

    let res = await fetch('http://localhost:3000/api/hello')
    let posts = await res.json();

    return {
        props: { posts }, // will be passed to the page component as props
    }
}

export default function showapi({ posts }) {
    const [a, seta] = useState(posts)
    const [b, setb] = useState()
    const [value, setvalue] = useState()

    function handlechange(e) {
        setvalue(e.target.value)
    }

    async function callingapi() {
        
        let res = await fetch('http://localhost:3000/api/demodata?value=' + value)
        res = await res.json();
        setb(res)
    }

    // console.log(value)
    return (
        <>
            <div class="card">
                <div class="card-body text-center">
                    <p> this is data from an getServerSideProps : <br></br>{a.name}</p>
                </div>
            </div>


           

            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">Enter password for hashing</h5>
                    <input type='text' class="card-text" onChange={handlechange}></input>
                    <br></br>
                    <button class="btn btn-primary" onClick={callingapi}>Submit</button>
                </div>
                    <div class="card-footer text-body-secondary">
                        {b ? <p>{b.data}</p> : ''}
                    </div>
                </div>
        </>
    )
}