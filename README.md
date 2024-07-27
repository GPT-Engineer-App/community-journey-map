# community-journey-map

Lets build a "Community Retention Survey" as an interactive experience where participants can see their community's "profile" building in real-time on the right side as they answer questions one by one. Use engaging visuals and animations to make the process feel more like a journey of discovery. + Dynamically calculate a "Community Health Score" based on the participant's responses.


## Survey Fields

1. **Member Information**
   - Community Name: [Text]
   - Membership Duration: [Select: 0-3 months, 4-6 months, 7-12 months, 1-2 years, 2+ years]

2. **Engagement**
   - Participation Frequency: [Select: Daily, Weekly, Monthly, Quarterly, Rarely]
   - Number of Events Attended (Last 3 Months): [Number]

3. **Satisfaction and Retention**
   - Overall Satisfaction: [Scale 1-10]
   - Likelihood to Renew: [Scale 1-10]
   - Consideration of Cancellation: [Yes/No]
   - If Yes, Primary Reason: [Text]

4. **Value and Improvement**
   - Clear Pathway to Improvement: [Scale 1-10]
   - Ease of Taking First Step: [Scale 1-10]
   - Most Valuable Aspect: [Text]
   - Least Valuable Aspect: [Text]

5. **Community Connection**
   - Feeling of Welcome: [Scale 1-10]
   - Connection to Community: [Scale 1-10]
   - Perception of Community's Unique Personality: [Scale 1-10]

6. **Goals and Support**
   - Primary Goal for Membership: [Text]
   - Confidence in Achieving Goal: [Scale 1-10]
   - Additional Support Needed: [Text]

7. **Onboarding Experience**
   - Satisfaction with Welcome Process: [Scale 1-10]
   - Clarity of Initial Steps: [Scale 1-10]
   - Suggested Onboarding Improvements: [Text]

## Metrics Calculation

1. **Retention Score**
   - Formula: (Likelihood to Renew + Overall Satisfaction) / 2
   - Range: 1-10

2. **Engagement Index**
   - Assign points based on Participation Frequency:
     Daily = 5, Weekly = 4, Monthly = 3, Quarterly = 2, Rarely = 1
   - Add points for Events Attended (max 5 points)
   - Formula: (Frequency Points + Event Points) / 2
   - Range: 1-5

3. **Retention Point Effectiveness**
   - Formula: (Clear Pathway + Ease of First Step + Feeling of Welcome) / 3
   - Range: 1-10

4. **Community Connection Score**
   - Formula: (Connection to Community + Perception of Unique Personality) / 2
   - Range: 1-10

5. **Onboarding Effectiveness**
   - Formula: (Satisfaction with Welcome Process + Clarity of Initial Steps) / 2
   - Range: 1-10

6. **Goal Alignment**
   - Formula: Confidence in Achieving Goal
   - Range: 1-10

7. **Net Promoter Score (NPS)**
   - Use the Likelihood to Renew as a proxy for NPS
   - Promoters: 9-10, Passives: 7-8, Detractors: 0-6
   - Formula: % Promoters - % Detractors
   - Range: -100 to 100

## Visualizations

1. **Retention Radar Chart**
   - Plot Retention Score, Engagement Index, Retention Point Effectiveness, Community Connection Score, and Onboarding Effectiveness on a radar chart

2. **NPS Distribution**
   - Stacked bar chart showing percentages of Promoters, Passives, and Detractors

3. **Membership Duration vs. Retention Score**
   - Scatter plot with Membership Duration on x-axis and Retention Score on y-axis

4. **Top Valuable Aspects**
   - Word cloud generated from "Most Valuable Aspect" responses

5. **Goal Alignment Distribution**
   - Histogram of Goal Alignment scores

6. **Engagement Funnel**
   - Funnel chart showing drop-off from total members to daily active members

7. **Improvement Areas**
   - Bar chart of average scores for Clear Pathway, Ease of First Step, Feeling of Welcome, and Clarity of Initial Steps

These visualizations will provide a comprehensive overview of community health, highlighting areas of strength and opportunities for improvement across different communities.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/community-journey-map.git
cd community-journey-map
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
