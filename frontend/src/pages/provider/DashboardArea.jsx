
function DashboardArea() {
    return (
        <>
            <div className="bg-dashbg1 w-full h-full px-5 py-7 flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-webkit">
                <div className="w-full bg-gradient-to-r from-[#e17b6a] to bg-[#ce472f] rounded-md p-5 flex flex-col justify-around gap-2">
                    <div className="text-xl md:text-2xl font-bold text-white">
                        Welcome back, Shivanshu Pathak!
                    </div>
                    <div className="text-md text-gray-200">
                        Ready to make a difference? Share your surplus food with those in need.
                    </div>
                </div>
                {/* Dash Stats */}
                <div className="grid grid-rows md:grid-cols-3 gap-4 mb-6">
                    <StatBox label="Total Donations" value={0} color="text-black" />
                    <StatBox label="People Fed" value={0} color="text-black" />
                    <StatBox label="Active Listings" value={0} color="text-black" />
                </div>

                {/* Quick Actions and recent activity */}
                <div className="flex flex-col lg:flex-row gap-5 ">
                    <div className="w-full bg-dashcard1 rounded-md flex flex-col border-2 border-pink2 shadow-[3px_3px_3px_-1px_rgba(0,0,0,0.3)]">
                        <div className="p-4 text-xl font-medium border-b-2 border-pink2">
                            Recent Activity
                        </div>
                        <RecentCard title="No Recent Activity" location="" time=""/>
                        {/* <RecentCard title="Wedding Reception Food" location="Downtown Community Center" time="2 hours"/>
                        <RecentCard title="Wedding Reception Food" location="Downtown Community Center" time="2 hours"/> */}
                    </div>
                    <div className="w-full bg-dashcard1 rounded-md flex flex-col border-2 border-pink2 shadow-[3px_3px_3px_-1px_rgba(0,0,0,0.3)]">
                        <div className="p-4 text-xl font-medium border-b-2 border-pink2">
                            Quick Actions
                        </div>
                        <div className="py-4 px-6 flex flex-col gap-6">
                            <div className="py-3 px-4 border-dashed border-2 border-gray-400 hover:border-green-500 hover:bg-green-200/60 cursor-pointer rounded-lg">
                                <div className="text-md font-medium">
                                    Post New Food Listing
                                </div>
                                <div className="text-sm text-gray-600">
                                    Share surplus food with the community
                                </div>
                            </div>
                            <div className="py-3 px-4 border-dashed border-2 border-gray-400 hover:border-blue-500 hover:bg-blue-200/60 cursor-pointer rounded-lg">
                                <div className="text-md font-medium">
                                    Find Nearby Seekers
                                </div>
                                <div className="text-sm text-gray-600">
                                    Connect with NGOs and individuals
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function RecentCard({title, location, time}){
    return(
        <>
            <div className="p-4 border-b-2 border-pink2">
                <div className="text-md font-medium mb-1">
                    {title}
                </div>
                <div className="flex items-center gap-x-5 text-sm text-gray-700">
                    <span>{location}</span>
                    <span>{time}</span>
                </div>
            </div>
        </>
    )
}
function StatBox({ label, value, color = 'text-white' }) {
    return (
        <div className="bg-dashcard1 rounded-lg py-4 px-[7%] shadow-[3px_3px_3px_-1px_rgba(0,0,0,0.3)] border-2 border-pink2">
            <p className="text-sm font-medium text-tracktext">{label}</p>
            <p className={`text-3xl py-1 font-bold ${color}`}>{value}</p>
        </div>
    )
}

export default DashboardArea;