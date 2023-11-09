import {useState} from "react";
import GooeyCircleLoader from 'react-loaders-kit/lib/bars/BarsLoader'; // Recommended to reduce bundle size

export default function MyWonderfulComponent(){
    const [loading, setLoading] = useState(true);

    const loaderProps = {
        loading,
        size: 35,
        duration: 1,
        colors: ['#5e22f0', '#f6b93b']
    }

    return (
        <GooeyCircleLoader {...loaderProps} />
    )
}