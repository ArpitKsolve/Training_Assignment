public class AssignmentTask1Class {
    
    public List<SelectOption> instituteOptions{get;set;}
    public String selectedValue{get;set;}
    public List<Mentor__c> mentors{get;set;}
    public List<Student__c> students{get;set;}
    public String selectedMentorId { get; set; }
    public Boolean showMentorTable { get; set; }
    public Boolean showStudentTable {get;set;}
    
    
    
    public  AssignmentTask1Class()
    {
        instituteOptions=getInstitute();
    }
    
    public List<SelectOption> getInstitute() {
 	 	instituteOptions = new List<SelectOption>();
 	 	for(Institute__c inst:[Select id,Name from Institute__c])
        {
            instituteOptions.add(new SelectOption(inst.Id,inst.Name));
        }
        
        return instituteOptions;
  	}

    public void getMentors()
    {
        system.debug(selectedValue);
        mentors = [SELECT Id,Name,Designation__c FROM Mentor__c WHERE Institute__c = :selectedValue];
        showMentorTable = !mentors.isEmpty();
        
        students=null;
        if(students==null)
        {
            showStudentTable=false;
        }    
    }
    
    public void getStudents()
    {
        System.debug(selectedMentorId);
        students= [SELECT Id, Name,Mentor__c,City__c,State__c FROM Student__c WHERE Mentor__c  = :selectedMentorId];
        showStudentTable=!students.isEmpty();       
    }
    
}