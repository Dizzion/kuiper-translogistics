import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

interface FooterProps {
    variant: string;
    elapsedTime: string;
}

export const CardFooter: React.FC<FooterProps> = ({ variant, elapsedTime }) => {
    const [content, setContent] = useState<React.JSX.Element>(<Card.Footer></Card.Footer>);

    useEffect(() => {
        if (variant === 'success') {
            setContent(<Card.Footer>Successful Passed this Stage</Card.Footer>);
        } else if (variant === 'info') {
            setContent(<Card.Footer>Time Since Previous Scan: {elapsedTime}</Card.Footer>)
        } else {
            setContent(<Card.Footer></Card.Footer>)
        }
    }, [ variant , elapsedTime ]);
  return (
    <>{content}</>
  )
}