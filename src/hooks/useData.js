import {useState, useEffect} from "react"
import {csv} from "d3"

const csvUrl = "https://gist.githubusercontent.com/Lewisjohnward/7a8eb5a17366a2cc83e1c414e06c492b/raw/694a4554ea8f06007acb8c5419a4b3f33e94fc23/Lessons.csv"

export const useData = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const row = d => {
            d.date = new Date(+d.date)
            d.length = +(d.length / 60)
            d.id = +d.id
            d.lessons = 1
            return d
        }

        csv(csvUrl, row).then(setData)


    }, [])

    return data
}