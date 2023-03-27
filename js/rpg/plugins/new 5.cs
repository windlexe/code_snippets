void initArr(int *parr,int n)
{
	int i;
	srand(time(NULL));
	for(i=0;i<n;i++)
	{
		*(parr+i)=rand()%101;
		//*(parr+i)=rand()%101;
	}
}

void printArr(int *parr,int n)
{
	int i;
	for(i=0;i<n;i++)
	{
		printf("%5d",*parr++);
	}
}

void Bubblesort(int *parr,int n)
{
	int *p=parr,*pstart=p,*pend=p+n-1,i;
	for(i=0;i<n-1;i++)
	{
		for(p=parr;p<pend;p++)
		{
			if(*p<*(p+1))
			{
				int temp;
				temp=*p;
				*p=*(p+1);
				*(p+1)=temp;
			}
		}
	}	
}
