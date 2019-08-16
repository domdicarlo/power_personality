## Power and Personality Pilot Study Summer 2019

### Maestripieri Lab

#### Questionnaire Variables Guide

This is an explanation of each variable given in the final tidy dataframes output at the end of the power_personality_cleaner.Rmd script. 

Each variable in this list also refers to its item number in its respective assessment, found in the "assessments" folder. For more information about what these assessments and questions are addressing, check the assessments folder.

## **NOTE!!!!**

All variables are actually completely lower case in the file, so please forgive my capitalizing. Spaces have been replaced with underscores

**MSOI**

"Sexual Orientation" - MSOI 1

"Intercourse Partners - All" - MSOI 2 a

"Intercourse Partners - Short Term" - MSOI 2 b

"Intercourse Partners - Committed Partner" - MSOI 2 c

"Intercourse Partners - Committed Self" - MSOI 2 d

"Intercourse Partners - All (Past Year)" - MSOI 3 a

"Intercourse Partners - Short Term (Past Year)" - MSOI 3 b

"Intercourse Partners - Committed Partner (Past Year)" - MSOI 3 c

"Intercourse Partners - Committed Self (Past Year)" - MSOI 3 d

"Intercourse Partners - All (Next Five Years)" - MSOI 4 a

"Intercourse Partners - Committed (Next Five Years)" - MSOI 4 b

"Intercourse Partners - Short Term (Next Five Years)" - MSOI 4 c

"Intercourse Partners - One Time Only" - MSOI 5

"Sex Partners - Other than Partner (In Committed Relationship)" - MSOI 6 

"Fantasy Rate While in Committed Relationship" - MSOI 7

"LMTO Score" 
"SMTO Score"
"Previous Sexual Behavior Score" - These are the relevant score from the 2007 Jackson and Kirkpatrick Paper on MSOI. For more information, see that paper.

**HSNS**

"HSNS Score" -> Calculated simply by adding up all the HSNS items together.

**NPI**

The NPI_Score is the score on the NPI scale

**SPQ**

The various subscales are based on the SPQ-BR paper's detailing of these subscales, found in the folder for this assessment. The total score is of course the total score on the scale.

**mac ss**

This is based from 10 choices, 10 different places the individual can place themself on the ladder, 1-10 , lower is lower in social status (in the way that is most meaningful to the individual)

**APQ**

Academic Performance Quotient 

APQ Grade Trajectory: 1 - "My grades have been steadily improving"
                      2 - "My grades have been steadily getting worse"
                      3 - "My grades have remained more or less the same"
                      4 - "My grades have been highly variable, without a clear trend"

Math, Social Studies (History, Economics, Gov't, etc.), Science, English,
Grade                 1 - A
                      2 - B
                      3 - C
                      4 - D or lower
                      5 - Did not take subject
                      6 - Subject wasn't graded this way

Grade Intelligence Comparison 
("Do you feel that your college grades match your intelligence and skills?")
                      1 - Yes, my grades accurately reflect my ability
                      2 - No, I could have done better in school

Tutoring
("Have you ever received tutoring for homework in college?")
                      1 - yes
                      2 - no

Standardized Test
Standardized_Test - specifies the test
SAT, ACT, Other_Test Score - the actual score 

Academic Ambition 
1 - Extremely Ambition
2 - Very Ambitious
3 - Somewhat Ambitious
4 - Not very ambitious
5 - Not at all ambitious

Performance_Identity 
("How important is your academic performance to the identity?")
1 - Extrememly Important
2 - Very Important
3 - Somewhat Important
4 - Not very important
5 - Not at all important

Grade Anxiety ("How much do you worry about grades?")
1 - All the time
2 - Often
3 - Sometimes
4 - Rarely
5 - Never

Colleague Rapport ("You feel close to people at your university.")
1 - Strongly Disagree
2 - Disagree
3 - Neutral
4 - Agree
5 - Strongly Agree

University Belonging ("You feel like you are part of your university.")
1 - Strongly Disagree
2 - Disagree
3 - Neutral
4 - Agree
5 - Strongly Agree

College Prejudice ("Students at your University are prejudiced")
1 - Strongly Disagree
2 - Disagree
3 - Neutral
4 - Agree
5 - Strongly Agree

University Happiness ("You are happy to be at your university.")
1 - Strongly Disagree
2 - Disagree
3 - Neutral
4 - Agree
5 - Strongly Agree

Professor Fairness ("The professors at your university treat students fairly.")
1 - Strongly Disagree
2 - Disagree
3 - Neutral
4 - Agree
5 - Strongly Agree

University Safety ("You feel safe in your university")
1 - Strongly Disagree
2 - Disagree
3 - Neutral
4 - Agree
5 - Strongly Agree

**PPI**

"PPI_SCORE" - this refers to the total score on the PPI scale. The other variables denote the various subscales found on the PPI Scoring sheet:

"PPI_MACH_SCORE" - Machievellian Egocentricity

"PPI_FEAR_SCORE" - Fearlessness

"PPI_REBEL_SCORE" - Rebellious Nonconformity

"PPI_BLAME_SCORE" - Blame Externalization

"PPI_STRESS_SCORE" - Stress Immunity

"PPI_COLD_SCORE" - Coldheartedness

"PPI_SOCIAL_SCORE" - Social Influence

"PPI_CAREFREE_SCORE" - Carefree Nonplanfulness

**HEXACO**

These should be self-explanatory. Only heed the SCORE Columns - the question columns were all coded in with the same name, but we only care about the score for each subscale of HEXACO rather than individual questions. 

**Couples Dominance**

This question is only asking: "Who is more dominant in the relationship?" 
1 - I am dominant
2 - I am somewhat dominant
3 - Egalitarian 
4 - They are somewhat dominant
5 - They are dominant

**Power Scale**

FP = Feeling Powerful, DP = Desire for Power, AP = Attention to Power

**STAI**

The total score ranges from 20-80, higher is higher anxiety

**AQ**

aq_score - self explanatory

**PAI**

The subscales are the listed subscales in the paper. For more info about these scales, see the paper (found in the assessments folder in PAI subfolder).

**Suicide**

suicide_thoughts_attempts - "Have you ever thought or attempted to kill yourself?"
1 - Never
2 - It was just a brief passing thought
3 - I have had a plan at least once to kill myself but did not try to do it
4 - I have had a plan at least once to kill myself and really wanted to die
5 - I hace attempted to kill myself, but did not want to die.
6 - I have attempted to kill myself, and really wanted to die.

suicidal_thoughts_freq - "How often have you thought about killing yourself in the past year?"
1 - Never
2 - Rarely (1 time)
3 - Sometimes (2 times)
4 - Often (3-4 times)
5 - Very often (5 or more times)

suicide_confide - "Have you ever told someone that you were going to commit suicide, or that you might do it?"
1 - No
2 - Yes, at one time, but did not really want to die
3 - Yes, at one time, and really wanted to die
4 - Yes, more than once, but did not want to do it
5 - Yes, more than once, and really wanted to do it

suicide_likelihood - "How likely is it that you will attempt suicide one day?"
1 - Never
2 - No chance at all
3 - Rather unlikely
4 - Unlikely
5 - Likely
6 - Rather likely
7 - Very likely

current_suicidality - "Are you currently suicidal?"
1 - No
2 - Yes


**Demographics**

Age - Age

Sex: 1 - Male, 2 - Female

Ethnicity:
1 - American Indian or Alaskan Native
2 - Asian or Asian American
3 - Black or African American
4 - Hispanic/Latino
5 - Native Hawaiian or other Pacific Islander
6 - White
7 - Other

State_Born - 1-51 Are the 50 states + District of Columbia in alphabetical order. will not put here, but this should be easy to find should you find this data relevant. Or download the data again and replace the numbers with the text for this column, by copy and pasting in excel. Might add this in later if it's important. 

Marriage:
1 - Never Married
2 - Separated
3 - Divorced
4 - Widowed
5 - Currently married

Occupation: Just a text string for their occupation

Major: text string

raised_by: 
1 - A single parent
2 - Two parents, married
3 - Two parents, divorced
4 - A grandparent(s)/other relative(s)
5 - Other

smoke - "Do you smoke?"
1 - No
2 - Sometimes
3 - Yes

alcohol - "Do you drink alcohol?"
1 - No
2 - Sometimes
3 - Yes

hormone_drugs - "Are you taking any substances that might affect your hormone levels (e.g. steroids, antiglucocorticoids, antidepressants, etc.)?"
1 - No
2 - Maybe/not sure
3 - Yes

hormone_drugs_1_TEXT - if hormone_drugs answered maybe, this text string is the name of the drug

hormone_drugs_2_TEXT - if hormone_drugs answered yes, this text string is the name of the drug

end - comments offered for the study 

**TSST**

pre/post_TSST_ShameBehavior_Score - as titled, looks at the shame measurements for the test before/after the TSST

pre/post_TSST_Devaluation_Score - as titled, looks at the devaluation measurements for the test before/after the TSST

pre/post_TSST_STAI_Score - as titled, looks at the STAI(Anxiety) measurements for the test before/after the TSST

pre/post_TSST_STAI_Score - as titled, looks at the STAI(Anxiety) measurements for the test before/after the TSST

TSST_(blank)_Diff_Score - measures the subtraction between the before and after measurement for the tsst

**In lab info**

*Working memory task* 

fta.score - This is the score the participant achieved when the full-trial accuracy scoring method is used.

prop.score -  This is the score the participant achieved when the proportion correct scoring method is used. here, partially correct trials count.

number.successes 	- The score obtained by the participant when the number of correctly recalled elements method of scoring is used.

processing.accuracy 	- The proportion of the symmetry judgements that were successfully answered.

processing.median.rt -	The median response time for answering during the processing phase.

max.span -	Maximum list length at which the participant successfully recalled all the elements in the trial.

span.2.corr - Number of trials successfully answered (all grids recalled) at list length 2

span.3.corr -	Number of trials successfully answered (all grids recalled) at list length 3 

span.4.corr -	Number of trials successfully answered (all grids recalled) at list length 4

span.5.corr -	Number of trials successfully answered (all grids recalled) at list length 5 

span.6.corr -	Number of trials successfully answered (all grids recalled) at list length 6 

span.7.corr -	Number of trials successfully answered (all grids recalled) at list length 7

*other*

eaten, drank, smoked, exercised - each of these are if the person did this thing, either in the last hour or in the day. y or n.

handgrip_1/2/3 - score in lbs for handgrip strength of three trials

max_handgrip - score in lbs for max of three trials in handgrip strength
