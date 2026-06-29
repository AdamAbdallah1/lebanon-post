const categories = [
  {
    key:"lebanon",
    label:"Lebanon"
  },
  {
    key:"sports",
    label:"Sports"
  },
  {
    key:"world",
    label:"International"
  },
  {
    key:"middleeast",
    label:"Middle East"
  }
];


function CategoryFilter({category,setCategory}) {

return (
<div className="flex flex-wrap gap-2">

{
categories.map(cat=>(
<button
key={cat.key}
onClick={()=>setCategory(cat.key)}
className={`px-4 py-1.5 rounded-full text-xs border ${
category===cat.key
?"bg-white text-black"
:"border-white/20 text-gray-300"
}`}
>

{cat.label}

</button>
))
}

</div>
)

}


export default CategoryFilter;