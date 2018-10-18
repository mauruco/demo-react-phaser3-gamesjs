const Config = () => {

    if(process.env.NODE_ENV === 'development'){

        return {
            url: 'http://localhost:3000'
        };
    }
        
    return {
        url: 'http://localhost:3000'
    };
};

export default Config;