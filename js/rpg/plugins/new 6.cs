#include <stdio.h>

void main()
{
	int arr[10];
	void initArr(int *);
	void printArr(int *);
	void changeArr(int *);
	void swapint(int*,int*);
	
	initArr(arr);
	changeArr(arr);
	printf(arr);
}
void initArr(int *parr)
{
	int i;
	for(i=0;i<10;i++)
	{
		scanf("%d",parr++);
	}
}
void printArr(int* parr)
{
	int i;
	for(i=0;i<10;i++)
	{
		printf("%5d \n",*parr++);
	}
}
void swapint(int *p1,int*p2)
{
	int temp;
	temp=*p1;
	*p1=*p2;
	*p2=temp;
}
void changeArr(int *parr)
{
	int* pmin=parr,*pmax=pmin,*p=parr,i;
	for(i=1;i<10;i++;p++)
	{
		if(*p>*pmax)
		{
			pmax=p;
		}
		else if(*p<*pmin)
		{
			pmin=p;
		}
	}
	swapInt(pmin,parr);
	if(pmax==parr)
	{
		swapInt(pmin,parr+9);
	}
	else
	{
		swapInt(pmax,parr+9);
	}
	swapInt(pmax,parr+9);
}
