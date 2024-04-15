@isTest
public class TestTask2 {

    @isTest
    static void testStudentUpdate() {
        // Create test data
        Student__c oldStudent = new Student__c(Name = 'TestStudent2', Aadhaar_Number__c = '123499999', City__c = 'Sample City2',Mark_For_Delete__c='YES');
        insert oldStudent;

      
        oldStudent.City__c = 'Delhi';
        update oldStudent;

        
        List<Student_History__c> historyRecords = [SELECT Id FROM Student_History__c WHERE Record_Id__c = :oldStudent.Id];
        System.assertEquals(1, historyRecords.size(), 'Expected one Student History record to be created');
    }
}