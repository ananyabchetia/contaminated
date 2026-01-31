## What is this story about?

### This project examines a small community’s fight against a wood treatment facility that polluted groundwater and air, and released hazardous waste for decades in Eugene, Oregon.

### The reported story is published here: **[A guilty plea was just the beginning.](https://ananyabchetia.github.io/contaminated/)**

### The project also investigates how many public schools are located within one mile of a Superfund site. This repository contains the data, analysis and code used to discover this.

## File structure

### 1. scrollytelling_images

#### Contains assets used for the scrollytelling portion of the story built with Scrollama. Graphics were created using Google Earth imagery, Adobe Illustrator and ai2html.

<a href="https://ananyabchetia.github.io/contaminated/">
  <img src="scrollytelling_images/readme_images/scrollytelling.png" alt="Scrollytelling visualization example" width="400">
</a>

### 2. all_datasets

### Stores all dataset folders used in the reporting and analysis for this project:

#### a. FOIA - Public records of odor complaints from the wood treatment facility in Eugene, Oregon.

#### b. PDFs_of_superfunds - EPA PDFs listing proposed and active Superfund sites.

#### c. Superfund_list_csv - CSV files generated from the EPA Superfund PDFs. These cleaned files can be used directly instead of scraping the PDFs.

#### d. public_school_dataset - Excel file containes public school locations across the United States and a derived CSV showing that nearly 1,800 public schools are located within one mile of a Superfund site.

### 3. Google_Maps_API

#### This folder contains an interactive Google Maps API–powered tool that lets users evaluate environmental risk by measuring the proximity of schools and homes to Superfund sites.

#### Please note, I added this interactive tool last summer, after my story published in March.

## Workflow

### 1. first_notebook.ipynb:

#### Uses geospatial analysis to identify public schools located within one mile of Superfund sites.

#### Specifically uses GeoPandas for spatial operations, reprojects geometries to EPSG:5070 and applies a one-mile buffer to calculate proximity.

### 2. second_notebook.ipynb:

#### Cleans FOIA-requested complaint data and formats it for a Datawrapper visualization.

## Final

### This story involved reading dozens of court records, filing public records requests, interviewing vulnerable sources and combining data with in-depth reporting. (And yes, all under a tight deadline.)

### If you’re interested to learn more about the reporting side, check it out **[here](story.md)**.
