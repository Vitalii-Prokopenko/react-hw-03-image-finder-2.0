import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
    <ThreeDots
    visible={true}
    height="80"
    width="80"
    color="#C21292"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
);

export default Loader;