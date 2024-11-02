import React from 'react'
import './ProductFilter.css'
import DbData from '../Db/Db.js'


function ProductFilter() {

    //State Part
    const [data, setData] = React.useState(DbData)

    //Function Part
    const handleFilter = (brandName) => {

        const filterData = DbData.filter((item) => {
            return item.brand === brandName
        })

        setData(filterData);
    }


    const handleSearch = (brandName) => {

        const filterData = DbData.filter((item) => {

            const brand = item.brand.toLowerCase()
            const model = item.model.toLowerCase()

            let search = brandName.toLowerCase()
            search = search.trim()

            return brand === search || model === search

        })

        setData(filterData);

        if (brandName === '') {
            setData(DbData);
        }
    }

    return (
        <>
            <section className='pt-6 pb-6'>
                <div className="container">

                    <div className="menu flex gap-4 justify-center">
                        <button onClick={() => setData(DbData)}>All</button>
                        <button onClick={() => handleFilter('Apple')}>Apple</button>
                        <button onClick={() => handleFilter('Google')}>Google</button>
                        <button onClick={() => handleFilter('Samsung')}>Samsung</button>

                        <input type="text" placeholder="Search" onKeyUp={(e) => handleSearch(e.target.value)} />
                    </div>


                    <div className="items flex flex-wrap gap-6 justify-center">
                        {data.map((item, i) => (

                            <div key={i} className="card mt-[40px] w-[400px] h-[200px] flex gap-3 relative">

                                {item.discount && (
                                    <h2 className='discount'>SALE</h2>
                                )}

                                <div className="img rounded-md overflow-hidden">
                                    <img src={item.img} alt="" className='w-[200px] h-[200px]' />
                                </div>

                                <div className="text p-2">
                                    <h2 className='model'>{item.model}</h2>

                                    <ul>
                                        <li>Ram     : {item.ram} </li>
                                        <li>Camera  : {item.camera} </li>
                                        <li>Display : {item.display} </li>
                                    </ul>

                                    <h2 className='price text-lg font-bold'>

                                        <span className={item.discount == true ? 'text-gray-400 line-through' : 'text-[#EBB137]'}>
                                            ${item.price}
                                        </span>

                                        {
                                            item.discount == true && (
                                                <span className='text-[#EBB137] ml-2'>{item.discount_price}</span>
                                            )
                                        }
                                    </h2>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductFilter
