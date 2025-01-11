## SPFA-Logger-lib
Provides a logger that will log all SPFA services to winston and provide the functions for handling GA4 logging


### Package setup 
Ensure that you have setup the below env variable in the project that in envoking this package. 

```env
ES_PASS=*******
ES_PATTERN=app-logs-dev
ES_URL=https://logs.spfacanada.ca/
ES_USER=*****
```

Please note: This setup is for your local use only. Once you run your oject througt the SPFA jenkins pipeline the variables needs at each step will be automatically injected