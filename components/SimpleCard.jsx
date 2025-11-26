export const SimpleCard = ({Icon, title, body}) => {
    return (
        <div className={`flex flex-col gap-4 p-5 rounded-md hover:scale-105 duration-200 bg-lighter`}>
            <div className="text-primary">
                <Icon size={60} />
            </div>
            <div>
                <h5 className="text-2xl font-bold text-primary">{title}</h5>
                <p>{body}</p>
            </div>
        </div>
    )
}
