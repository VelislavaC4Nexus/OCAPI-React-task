
const Loading = ({ message }) => {
    console.log('loading');
    if (message) {
        return <div>{message}</div>;
    }
    return <div>Loading...</div>;
};
export default Loading;