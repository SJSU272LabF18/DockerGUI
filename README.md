# Project-Team-10

Student Names:
1)	Drusti Thakkar – Team Lead
2)	Sanjna Dhamejani
3)	Divjyot Singh Khanuja
4)	Jasnoor Brar

No of Ideas: 04

Idea 1: Medication assistance and safety for Alzheimer patients

Abstract

“Alzheimer's is a type of dementia that causes problems with memory, thinking and behavior. Symptoms usually develop slowly and get worse over time, becoming severe enough to interfere with daily tasks.”[1] 

Addressing the problem: 

Alzheimer patients have a history of facing severe health disasters because of missed medications. Patients with Alzheimer live an average of eight years after their symptoms are noticeable to others, which is a concerningly small span of time.

There are 3 main things Alzheimer patients need help for:

-	Proper organization of their medicines and pills
-	Regular and appropriate reminders for medication
-	Information about the quantity of pills available with them and reminders for refilling.

Proposed Solution:

The pill boxes available in the market solve the problem of patients for organization of medicines quite a bit, but Alzheimer patients need much more than medicine organization. 
The solution for all the addressed problems can be an IOT device which solves each of the problems for the patients, and eventually reducing health risks for the patients. A Raspberry Pi model can be used to get medicine data from the pill boxes, sending the data to cloud, evaluating the data and finally simplify the situation for the patient.

Methodology:

-	Raspberry Pi weight sensors placed in each cell of pill organizer
-	Data is deployed to online server or cloud
-	Data is sent to application on patient’s phone
-	Patient is notified for any activity required

REFERENCES
1.	Alzheimer’s Association: https://www.alz.org/alzheimers-dementia/what-is-alzheimers



Idea 2: Protecting valuable belongings using blockchain

Abstract: 

	Millions of people today have been victim to theft, a record increasing every year. Everybody owns valuable items such as jewelry, electronic gadgets, easy mode of transportation such as bicycles and bird bikes etc. Some items also hold emotional value such as gifts and ancestral items. With the increase in theft cases, such items become very vulnerable to robbery and its very disturbing to lose any of these items. The government does provide us with the facility of reporting such crimes to the police department with the hope of recovering the lost item. However, it’s very difficult to recover items which do not have a tracking system. This is where blockchain comes to rescue by giving the items a digital identity. The project aims at providing a mechanism to write a proof of ownership to the Ethereum blockchain thereby making the recovery of stolen items easier.

Methodology: Use a tag created using blockchain technology and embedding it with smart sensors to detect location. 



Idea 3: Docker Wine

Abstract: 

	One of the big drawbacks of Docker contains as compared to virtual machines is that Dockerized apps are not cross-platform. You can’t run a Docker Linux app on Windows or vice-versa—at least not natively. With Docker-Wine, however, running Windows apps on Linux using Docker is possible. Docker-Wine uses the Wine Compatibility Layer to support Windows app on Linux. (There’s no support for Linux apps on Windows, as that would be a whole different can of worms.)

Methodology:

Wine on Docker with dynamic graphic drivers and VirtualGL with both local and remote support. It works out of the box with all Nvidia cards and Nvidia drivers and most other cards as well that use Mesa drivers. It is setup to auto adapt to whatever drivers you may have installed as long as they are the most recent ones for your branch.



Idea 4: CMT Container migration tool

Abstract:

Checkpoint & Restore is still a feature which is not generically available to container users. Certain understanding about how it works is needed and it’s most likely that users get errors when trying to perform CR due to some restrictions or differences between the source and the target host. The purpose of the project is to create an external command line tool that can be either used with docker or runC which helps on the task to live migrate containers between different hosts by performing pre-migration validations and allowing to auto-discover suitable target hosts.

Methodology:

	This project uses custom patched versions of runC to work. It's important to install these specific versions for CMT to work. CRIU patch has been already proposed to upstream, we hold on runC on the other hand because we needed to implement it fast and we're not sure of any impact on the project.


