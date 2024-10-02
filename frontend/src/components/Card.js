import React from 'react'
import './Card.css'
import profile from '../assets/profile.png'

const Card = ({ content }) => {
    return (
        <div class="card">
            <div class="card-header">
                <span class="card-id">CAM-11</span>
                <img src={profile} class="profile-image" />
            </div>
            <div class="card-title">Conduct Security Vulnerability Assessment</div>
            <div class="card-text">
                <span class="feature-request">Feature Request</span>
            </div>
        </div>
    )
}

export default Card