function Stats(){
    return(
        <>
            <div className="w-full py-15 px-2 bg-pink2 flex flex-col gap-10 lg:flex-row lg:gap-10 lg:justify-around">
                <div className="flex flex-col text-center gap-y-2">
                    <span className="text-darkblack1 text-4xl font-bold">1000+</span>
                    <span className="text-gray-500 text-2xl font-medium">Meals Saved</span>
                </div>
                <div className="flex flex-col text-center gap-y-2">
                    <span className="text-darkblack1 text-4xl font-bold">99+</span>
                    <span className="text-gray-500 text-2xl font-medium">People Connected</span>
                </div>
                <div className="flex flex-col text-center gap-y-2">
                    <span className="text-darkblack1 text-4xl font-bold">100+</span>
                    <span className="text-gray-500 text-2xl font-medium">Cities Covered</span>
                </div>
            </div>
        </>
    )
}

export default Stats;