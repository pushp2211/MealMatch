
function FirstPage() {
    return (
        <>
            <div id="home" className="w-full min-h-[90vh] px-[5%] py-18 bg-pink1 flex flex-col lg:flex-row lg:justify-center gap-15 lg:gap-10">
                <div className="w-full px-10 text-white flex flex-col gap-8 justify-center">
                    <div className="flex flex-col gap-3">
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkblack1 animate-slideup">
                            Connecting Food,
                        </div>
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkpink1 animate-slideup">
                            Connecting Hearts
                        </div>
                    </div>
                    <div className="text-gray-500 text-md md:text-lg mb-5">
                        Join MealMatch to transform excess food into meaningful connections. Whether you're a college, organization, or individual, help us reduce food waste while feeding communities in need.
                    </div>
                    <div>
                        <button className="py-2 px-5 lg:py-3 lg:px-6 text-md lg:text-lg font-medium bg-darkpink1 hover:bg-darkpink2 rounded-sm cursor-pointer active:scale-95">
                            Get Started
                        </button>
                    </div>
                </div>
                <div className="w-full px-10 bg-pink1 flex lg:items-center">
                    <img
                        src="/assets/p1.webp"
                        alt="image not found"
                        className="w-130 h-120 object-cover rounded-lg"
                    />
                </div>
            </div>
        </>
    )
}

export default FirstPage;