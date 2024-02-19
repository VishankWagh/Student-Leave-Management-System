const Count = ({ title, count, desc }) => {
    return (
        <div className="count">
            <h3 className="count-title">{title}</h3>
            <div className="count-box">
                <p className="count-val">{count}</p>
                <p className="count-desc">{desc}</p>
            </div>
        </div>
    );
}

export default Count;