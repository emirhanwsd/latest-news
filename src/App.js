import {SunIcon, MoonIcon, TemplateIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import dayjs from "dayjs";

const App = () => {

    const [mode, setMode] = useState(localStorage.getItem("mode") ?? "light")

    const {isLoading, data, isError} = useQuery("news", async () => {
        let result = await fetch(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)

        return result.json()
    }, {
        cacheTime: 10 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        localStorage.setItem("mode", mode)

        if (mode === "light") {
            document.documentElement.classList.remove("dark")
        } else {
            document.documentElement.classList.add("dark")
        }
    }, [mode])

    useEffect(() => {
        let previousMode = localStorage.getItem("mode") ?? "light"

        if (!["light", "dark"].includes(previousMode)) {
            previousMode = "light"
        }

        setMode(previousMode)
    }, [])

    if (isError || isLoading){
        return <></>
    }

    if (data.status !== "ok"){
        return <></>
    }

    return (
        <>
            <div className="text-zinc-900 bg-white dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
                <nav className="sm:px-96 px-8 py-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-700 transition-border">
                    <h1 className="text-3xl font-bold font-playfair tracking-wide">Latest News</h1>

                    {mode === "light"
                        ?
                        <SunIcon onClick={() => {
                            setMode("dark")
                        }} className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"/>
                        :
                        <MoonIcon onClick={() => {
                            setMode("light")
                        }} className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"/>
                    }
                </nav>

                <header className="sm:px-96 px-8 py-6 flex flex-col sm:flex-row gap-x-6">
                    <div className="sm:w-[28rem] flex flex-col gap-y-4">
                        {data.articles[0].urlToImage
                            ?
                                <a className="sm:w-[28rem] h-72 hover:opacity-90 transition-opacity" href={data.articles[0].url}>
                                    <img className="rounded shadow h-full" src={data.articles[0].urlToImage} alt={data.articles[0].title}/>
                                </a>
                            :
                                <div className="rounded shadow flex items-center justify-center w-[28rem] h-72 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-12 w-12 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                        }

                        <a href={data.articles[0].url} className="text-xl font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[0].title}</a>

                        <p className="text-sm line-clamp-2 text-zinc-500 dark:text-zinc-300 transition-colors max-w-sm">{data.articles[0].description}</p>

                        <div className="space-y-1">
                            <h4 className="text-xs">{data.articles[0].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[0].publishedAt).format("MMM D, YYYY")}</h4>

                            <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[0].author}</h6>
                        </div>
                    </div>

                    <div className="sm:w-96 flex flex-col gap-y-6 mr-6 sm:py-0 py-6">
                        <div className="h-28 flex gap-x-4">
                            {data.articles[1].urlToImage
                                ?
                                <a className="w-36 hover:opacity-90 transition-opacity" href={data.articles[1].url}>
                                    <img className="rounded shadow w-36 h-full" src={data.articles[1].urlToImage} alt={data.articles[1].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center w-36 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-1">
                                <a href={data.articles[1].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[1].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[1].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[1].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[1].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="h-28 flex gap-x-4">
                            {data.articles[2].urlToImage
                                ?
                                <a className="w-36 hover:opacity-90 transition-opacity" href={data.articles[2].url}>
                                    <img className="rounded shadow w-36 h-full" src={data.articles[2].urlToImage} alt={data.articles[2].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center w-36 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-1">
                                <a href={data.articles[2].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[2].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[2].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[2].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[2].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="h-28 flex gap-x-4">
                            {data.articles[3].urlToImage
                                ?
                                <a className="w-36 hover:opacity-90 transition-opacity" href={data.articles[3].url}>
                                    <img className="rounded shadow w-36 h-full" src={data.articles[3].urlToImage} alt={data.articles[3].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center w-36 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-1">
                                <a href={data.articles[3].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[3].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[3].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[3].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[3].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="h-28 flex gap-x-4">
                            {data.articles[4].urlToImage
                                ?
                                <a className="w-36 hover:opacity-90 transition-opacity" href={data.articles[4].url}>
                                    <img className="rounded shadow w-36 h-full" src={data.articles[4].urlToImage} alt={data.articles[4].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center w-36 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-1">
                                <a href={data.articles[4].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[4].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[4].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[4].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[4].author}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-y-6">
                        <h1 className="text-lg leading-loose font-semibold border-b border-zinc-200 dark:border-zinc-500 transition-border">
                            <span className="inline-block -mb-1 border-b border-zinc-400 dark:border-zinc-300 transition-border">Editor's Picked</span>
                        </h1>

                        <div className="h-24 flex gap-x-4">
                            <span className="w-8 text-2xl text-zinc-300 dark:text-zinc-500 transition-colors">01</span>

                            <div className="flex flex-1 flex-col justify-between">
                                <a href={data.articles[5].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[5].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[5].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[5].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[5].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="h-24 flex gap-x-4">
                            <span className="w-8 text-2xl text-zinc-300 dark:text-zinc-500 transition-colors">02</span>

                            <div className="flex flex-1 flex-col justify-between">
                                <a href={data.articles[6].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[6].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[6].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[6].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[6].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="h-24 flex gap-x-4">
                            <span className="w-8 text-2xl text-zinc-300 dark:text-zinc-500 transition-colors">03</span>

                            <div className="flex flex-1 flex-col justify-between">
                                <a href={data.articles[7].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[7].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[7].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[7].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[7].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="h-24 flex gap-x-4">
                            <span className="w-8 text-2xl text-zinc-300 dark:text-zinc-500 transition-colors">04</span>

                            <div className="flex flex-1 flex-col justify-between">
                                <a href={data.articles[8].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[8].title}</a>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[8].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[8].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs break-all"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[8].author}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="sm:px-96 px-8 pt-6 pb-12 flex flex-col gap-y-6">
                    <h1 className="text-lg leading-loose font-semibold border-b border-zinc-200 dark:border-zinc-500 transition-border">
                        <span className="inline-block -mb-1 border-b border-zinc-400 dark:border-zinc-300 transition-border">Today Highlight</span>
                    </h1>

                    <div className="flex flex-wrap gap-x-16 gap-y-12">
                        <div className="max-w-lg flex sm:flex-row flex-col gap-x-4 gap-y-4">
                            {data.articles[9].urlToImage
                                ?
                                <a className="h-48 sm:w-64 hover:opacity-90 transition-opacity" href={data.articles[9].url}>
                                    <img className="rounded shadow sm:w-64 w-full h-full" src={data.articles[9].urlToImage} alt={data.articles[9].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center h-48 sm:w-64 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-2">
                                <a href={data.articles[9].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[9].title}</a>

                                <p className="text-sm line-clamp-3 text-zinc-500 dark:text-zinc-300 transition-colors max-w-sm">{data.articles[9].description}</p>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[9].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[9].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[9].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-lg flex sm:flex-row flex-col gap-x-4 gap-y-4">
                            {data.articles[10].urlToImage
                                ?
                                <a className="h-48 sm:w-64 hover:opacity-90 transition-opacity" href={data.articles[10].url}>
                                    <img className="rounded shadow sm:w-64 w-full h-full" src={data.articles[10].urlToImage} alt={data.articles[10].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center h-48 sm:w-64 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-2">
                                <a href={data.articles[10].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[10].title}</a>

                                <p className="text-sm line-clamp-3 text-zinc-500 dark:text-zinc-300 transition-colors max-w-sm">{data.articles[10].description}</p>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[10].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[10].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[10].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-lg flex sm:flex-row flex-col gap-x-4 gap-y-4">
                            {data.articles[11].urlToImage
                                ?
                                <a className="h-48 sm:w-64 hover:opacity-90 transition-opacity" href={data.articles[11].url}>
                                    <img className="rounded shadow sm:w-64 w-full h-full" src={data.articles[11].urlToImage} alt={data.articles[11].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center h-48 sm:w-64 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-2">
                                <a href={data.articles[11].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[11].title}</a>

                                <p className="text-sm line-clamp-3 text-zinc-500 dark:text-zinc-300 transition-colors max-w-sm">{data.articles[11].description}</p>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[11].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[11].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[11].author}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-lg flex sm:flex-row flex-col gap-x-4 gap-y-4">
                            {data.articles[12].urlToImage
                                ?
                                <a className="h-48 sm:w-64 hover:opacity-90 transition-opacity" href={data.articles[12].url}>
                                    <img className="rounded shadow sm:w-64 w-full h-full" src={data.articles[12].urlToImage} alt={data.articles[12].title}/>
                                </a>
                                :
                                <div className="rounded shadow flex items-center justify-center h-48 sm:w-64 bg-zinc-900 dark:bg-zinc-50 transition-colors cursor-not-allowed">
                                    <TemplateIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-500 transition-colors"/>
                                </div>
                            }

                            <div className="flex flex-1 flex-col justify-between py-2">
                                <a href={data.articles[12].url} className="font-semibold hover:opacity-90 transition-opacity line-clamp-2">{data.articles[12].title}</a>

                                <p className="text-sm line-clamp-3 text-zinc-500 dark:text-zinc-300 transition-colors max-w-sm">{data.articles[12].description}</p>

                                <div className="space-y-1">
                                    <h4 className="text-xs">{data.articles[12].source.name} <span className="text-zinc-500 dark:text-zinc-300 transition-colors">•</span> {dayjs(data.articles[12].publishedAt).format("MMM D, YYYY")}</h4>

                                    <h6 className="text-xs"><span className="text-zinc-500 dark:text-zinc-300 transition-colors">from </span> {data.articles[12].author}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
