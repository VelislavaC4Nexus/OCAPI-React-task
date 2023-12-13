
const Loading = ({ message }) => {
    if (message) {
        return <div>{message}</div>;
    }
    return <div>Loading...</div>;
};
export default Loading;