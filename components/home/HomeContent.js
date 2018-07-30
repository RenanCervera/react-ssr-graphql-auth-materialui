import React from 'react'
import CenteredPaper from '../shared/CenteredPaper'


export default class HomeContent extends React.Component {
    render() {
        const { t } = this.props

        return (
            <CenteredPaper>
                {t('welcome')}

                <p>
                    <a href='/sitemap.xml' target='_blank'>
                        Sitemap
                    </a>
                    <br />
                    <a href='/robots.txt' target='_blank'>
                        Robots
                    </a>
                </p>
            </CenteredPaper>
        )
    }
}