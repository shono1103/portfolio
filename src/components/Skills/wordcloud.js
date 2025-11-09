import React, { useEffect, useRef } from 'react'

import TagCloud from 'TagCloud'

  const texts = [
    'Python',
    'Typescript',
    'C++',
	'Shell',
    'React',
    'NodeJS',
    'FastAPI',
    'Redis',
    'Docker',
    'Kubernetes',
    'Git',
    'Linux',
    'HTML5',
    'CSS3',
	'JavaScript',
    'C',
	'GDB',
	'WSL2',
	'Ruby',
	'Rails'
  ]

  const options = {
    radius: 300,
    // animation speed
    // slow, normal, fast
    maxSpeed: 'fast',
    initSpeed: 'fast',
    // 0 = top
    // 90 = left
    // 135 = right-bottom
    direction: 135,
    // interact with cursor move on mouse out
    keep: true,
  }
  //   to render wordcloud each time the page is reloaded
  useEffect(() => {
    if (isLoading) {
      TagCloud(container, texts, options)
      setLoad(false)
    }
  })

  return (
    <div className="main">
      <span className="content"></span>
    </div>
  )
}

export default WordCloud
