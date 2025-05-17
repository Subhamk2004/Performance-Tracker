import React from 'react';

function FeatureCard({ title, description, icon: Icon }) {
    return (
        <div className='bg-secondary p-4 rounded-3xl min-w-[300px] max-w-[350px]'>
            <div className="flex flex-col items-start gap-2">
                <div className=" flex items-center justify-center gap-3">
                    <Icon size={24} /> {/* Use the passed icon as a React component */}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <div>

                    <p className="text-gray-400 text-base">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default FeatureCard;
