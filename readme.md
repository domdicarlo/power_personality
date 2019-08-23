## Power and Personality Pilot Study Summer 2019

### Maestripieri Lab

Power and Personality Data Cleaner, by Dominic DiCarlo

#### About

Welcome to the data cleaner. This really only consists of one R Markdown file that takes the five data csvs from our pilot study. If you get similar data in another experiment, you should be able to modify the code somewhat to make it work for that project. In that sense, this is a template of sorts.

If you run the R markdown file here, you will get a .csv file in the ./data directory called "power_personality_summer_2019_data_cleaned.csv". This is a csv containing the data pretty clean, with just the total scores for the assessments tested. You can use the variable_guide.md file in this directory to learn more about the variables, as well as the ./assessments folder to read what things such as the NPI, SPQ are. Google searches to supplement this

#### Using your own data files

Make sure your updated data files are in the data folder. You can either change the path names to match the names of your files (within the .Rmd), or change your files to the name of the test files used in this cleaning process.

The temporary data files I used are as follows, all found in the ./data directory :

p_and_p_temp_data.csv -> This is the big file I got from qualtrics from participants completing the at-home surveys.

pre_tsst_temp_data.csv -> This is the pre tsst survey data, also from qualtrics.
 
post_tsst_temp_data.csv -> This is the post tsst survey data, also from qualtrics.

in_lab_info_temp.csv -> This is the data recorded on the csv on the ipad in the lab, containing things such as handgrip. 

wm_data_processed.csv -> This is the working memory test data, that was processed by the working memory script found at cognitivetools.uk . I will probably update this with how to use this script. We used the symmetry working memory test suite, also found there.

#### How to use

You only have to make sure the latest versions of these libraries are installed when you run:

library(readr)
library(dplyr)
library(tidyr)
library(tidyverse)

Then, simply open the R project in this directory, and hit run on the power_personality_cleaner.Rmd . You can run analyses within R using the final data frame, or use your preferred plotter to learn more about the data using this output csv. 