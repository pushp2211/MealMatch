import TestimonialCard from "./Card";

function Testimonials() {
    const testimonials = [
        {
            image: "/assets/p1.webp",
            name: "Shivanshu Pathak",
            city: "Prayagraj",
            review: "MealMatch helped us feed over 100 people with just one post. It's a lifesaver!",
        },
        {
            image: "/assets/p1.webp",
            name: "Shivanshu Pathak",
            city: "Prayagraj",
            review: "MealMatch helped us feed over 100 people with just one post. It's a lifesaver!",
        },
        {
            image: "/assets/p1.webp",
            name: "Shivanshu Pathak",
            city: "Prayagraj",
            review: "MealMatch helped us feed over 100 people with just one post. It's a lifesaver!",
        },
    ];

    return (
        <>
            <div id="testimonials" className="bg-pink1 w-full py-20 flex flex-col gap-10">
                <div className="flex flex-col justify-center items-center p-2 px-4 sm:px-6 lg:px-8">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-black size-16 lg:size-24">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                            </g>
                        </g>
                    </svg>

                    <div className="py-1 text-3xl lg:text-4xl text-darkblack1 font-bold text-center">
                        Stories That Matters
                    </div>
                    <div className="text-md lg:text-lg text-gray-500 font-normal text-center">
                        {/* Experience how a simple connection through MealMatch creates meaningful impact. */}
                        From saved meals to smiling faces, MealMatch connects food with purpose.
                    </div>
                </div>
                <div className="w-full px-4 py-10 flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 lg:gap-x-10 lg:gap-y-5 px-4 sm:px-6 lg:px-8">
                        {testimonials.slice(0, 6).map((t, idx) => (
                            <TestimonialCard
                                key={idx}
                                image={t.image}
                                name={t.name}
                                city={t.city}
                                review={t.review}
                            />
                        ))}
                    </div>
                </div>
                
            </div>

        </>
    )
}

export default Testimonials;