import { Circle, CrossIcon, Plus, ShieldCheck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { set } from 'zod';
import IncomponentLoading from './InComponentLoading';

function SearchedItems({
    searchedItems: items,
    closeSearch,
    loading
}) {

    let [searchedItems, setSearchedItems] = useState(items);

    useEffect(() => {
        setSearchedItems(items);
    }
        , [items]);
    return (
        <>
            {
                searchedItems.length === 0 ?
                    <div className='bg-secondary p-3 rounded-3xl mt-2 flex flex-col gap-3 shadow-black shadow-lg absolute z-20'>
                        <button className='flex justify-end' onClick={closeSearch}>
                            <X size='24' className='text-white' />
                        </button>
                        <div className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px]">
                            {
                                loading ?
                                    <IncomponentLoading isShort={true} />
                                    :
                                    <h3 className="text-lg font-bold text-white">
                                        No items found
                                    </h3>
                            }

                        </div>
                    </div>
                    :
                    <div className='bg-secondary p-3 rounded-3xl mt-2 flex flex-col gap-3 shadow-black shadow-xl absolute z-20 overflow-scroll no-scrollbar max-h-[500px]'>
                        <button className='flex justify-end' onClick={closeSearch}>
                            <Plus size='24' className='text-white rotate-45 p-1 hover:bg-primary rounded-full' />
                        </button>
                        {
                            !loading ?
                                <>
                                    {
                                        searchedItems.map((item, index) => (
                                            <div key={index} className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px] overflow-scroll no-scrollbar">
                                                <div className='flex flex-row justify-between items-center gap-2'>
                                                    <h3 className="text-lg font-bold text-white hover:underline">
                                                        <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                                                            {item.name}
                                                        </a>
                                                    </h3>

                                                    <span className='flex items-center gap-2'>
                                                        <img src={item.owner.avatar_url} alt={item.owner.login} className='w-8 h-8 rounded-full' />
                                                        <a className='text-sm text-gray-400 hover:underline' href={item.owner.html_url} target="_blank" rel="noopener noreferrer">
                                                            {item.owner.login}
                                                        </a>
                                                    </span>

                                                </div>
                                                <p className='text-gray-300 text-sm mt-1'>
                                                    Updated: {new Date(item.updated_at).toDateString()}
                                                </p>

                                                <p className="text-gray-300 text-sm">
                                                    {item.description || ''}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <div className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px]">
                                    <IncomponentLoading isShort={true} />
                                </div>
                        }
                    </div>
            }
        </>
    )
}

export default SearchedItems