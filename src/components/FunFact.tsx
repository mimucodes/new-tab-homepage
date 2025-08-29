import facts from '../interestingFacts.json'

type Fact = {
  id: string
  text: string
  category: string
}

export function FunFact() {
  const fact = getDailyFact(facts)

  return (
    <section id="facts" className="container">
      <p className="label">did you know</p>
      <p>{fact.text}</p>
    </section>
  )
}

function getDailyFact(facts: Fact[]): Fact {
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 0) // Jan 0 = Dec 31 previous year
  const diff = today.getTime() - startOfYear.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay) // 1–365

  const index = dayOfYear % facts.length
  return facts[index]
}
