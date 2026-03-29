import uuid
from datetime import datetime
# Assuming google-api-python-client is installed and 'service' is initialized

def create_accessible_lesson(service, teacher_email, student_email, start_time, end_time, lesson_name):
    """
    Creates a Google Calendar event with an automatic Google Meet link.
    """
    event = {
        'summary': f'Akıllı Ders: {lesson_name}',
        'description': f'{lesson_name} dersi için canlı bağlantı. Lütfen saati geldiğinde Meet linkine tıklayın.',
        'start': {'dateTime': start_time, 'timeZone': 'Europe/Istanbul'},
        'end': {'dateTime': end_time, 'timeZone': 'Europe/Istanbul'},
        'attendees': [{'email': teacher_email}, {'email': student_email}],
        'conferenceData': {
            'createRequest': {
                'requestId': f"lesson-{uuid.uuid4()}",
                'conferenceSolutionKey': {'type': 'hangoutsMeet'}
            }
        },
    }
    # conferenceDataVersion=1 is critical for generating the Meet link
    return service.events().insert(
        calendarId='primary', 
        body=event, 
        conferenceDataVersion=1
    ).execute()

def handle_lesson_decline(service, event_id, db_client=None):
    """
    Handles student rejection by deleting the calendar event and updating logic.
    """
    try:
        # 1. Pull the request from the calendar (Withdraw the request)
        service.events().delete(calendarId='primary', eventId=event_id).execute()
        
        # 2. Update status in DB (Implementation dependent)
        if db_client:
            db_client.update_lesson_status(event_id, "DECLINED")
            
        print(f"Lesson request {event_id} withdrawn successfully.")
        return True
    except Exception as e:
        print(f"Error withdrawing request: {e}")
        return False
