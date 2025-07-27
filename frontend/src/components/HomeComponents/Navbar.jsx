import VerticalNavbar from "./VerticalNavbar";

function HomeNav() {
    return (
        <>
            <div className="w-full flex justify-between p-3 items-center bg-pink1/75 backdrop-blur-sm sticky z-50 top-0 md:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
                <div className="w-ful p-2 flex flex-row gap-x-2 justify-start items-center font-semibold">
                    <a href="#home">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-darkpink1 size-5 sm:size-6">
                            <path
                                d="M480-520q-68-62-111-104.5T302-698q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-698q-24 31-67 73.5T480-520Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-840q-12 0-23.5 7T532-812l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-800q0 23 34 64.5T480-628ZM120-80v-122q-18-5-30-19t-14-34L40-640h25q23 0 40.5 16t19.5 39l24 265h171q33 0 56.5 23.5T400-240v40h-40v120h-60v-120H180v120h-60Zm320 0v-320H200q0-33 23.5-56.5T280-480h400q33 0 56.5 23.5T760-400H520v320h-80Zm160 0v-120h-40v-40q0-33 23.5-56.5T640-320h172l24-265q2-23 19-39t40-16h25l-35 385q-2 20-14.5 34T840-202v122h-60v-120H660v120h-60ZM480-628Z"
                                stroke="#FFFFFF"
                                stroke-width="20"
                            />
                        </svg>
                    </a>
                    <a href="#home">
                        <div className="text-lg sm:text-2xl text-darkpink1 items-center">MealMatch</div>
                    </a>
                </div>
                <div className="w-full px-2 flex gap-x-6 justify-end items-center">
                    <div className="hidden md:flex justify-end gap-x-8 text-darkblack1 text-md font-medium">
                        <a href="#working" className="hover:text-darkpink1">
                            How it works
                        </a>
                        <a href="#testimonials" className="hover:text-darkpink1">
                            Testimonials
                        </a>
                        <a href="#about" className="hover:text-darkpink1">
                            About us
                        </a>
                    </div>
                    <div className="flex justify-between gap-x-3 items-center text-sm sm:text-md font-medium">
                        <button className="bg-darkpink1 hover:bg-darkpink2 text-white py-2 px-3 cursor-pointer rounded-sm border-2 border-darkpink1 hover:border-darkpink2 active:scale-95">
                            Login
                        </button>
                        <button className="relative group py-2 px-3 text-darkpink1 cursor-pointer rounded-sm border-2 border-darkpink1 overflow-hidden active:scale-95">
                            <span className="absolute inset-0 w-0 bg-darkpink1 group-hover:w-full transition-all duration-400 ease-in-out z-0"></span>
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                Sign Up
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <VerticalNavbar />
        </>
    )
}

export default HomeNav;