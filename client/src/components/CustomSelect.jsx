import React from 'react'

const CustomSelect = ({label, options, placeholder, value, setValue}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <fieldset className="mb-4 flex flex-col gap-2">
        <label className="text-sm" htmlFor="role">{label}</label>
        <div  className="cursor-pointer relative rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]" name="role" id="role">
            <p type='button' onClick={() => {setIsOpen(!isOpen); setSearch('')}} className={`${value ? 'text-black' : 'text-gray-500'} w-full`}>{value || placeholder}</p>
            {isOpen && (
                <ul className="absolute w-full left-0 top-12 rounded-lg flex flex-col gap-2 bg-white border-2 border-gray-300 shadow-xl">
                    <input onChange={(e) => setSearch(e.target.value)} value={search}  className='w-full outline-none px-4 py-2 border-y-2 border-gray-300 focus:border-[#D7DDFF]' type="text"  placeholder={'Search'}/>
                    {filteredOptions.map((option) => (
                        <li onClick={() => {setValue(option.label);  setIsOpen(false)}} key={option.id} className='hover:bg-[#D7DDFF] px-4 py-2 transition duration-200 ease-in' >
                        {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </fieldset>
  )
}

export default CustomSelect