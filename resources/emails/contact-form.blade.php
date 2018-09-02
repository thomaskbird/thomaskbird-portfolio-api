<div style="padding:20px;border:1px solid #eee;margin:20px;">
    <h3>A new message has been created at http://thomaskbird.com</h3>

    <table>
        <tr>
            <td>Name:</td>
            <td>{{ $contact['name'] }}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>{{ $contact['email'] }}</td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td>{{ $contact['phone'] }}</td>
        </tr>
        <tr>
            <td>Message:</td>
            <td>{{ $contact['message'] }}</td>
        </tr>
        <tr>
            <td>Sent:</td>
            <td>{{ $contact['created_at'] }}</td>
        </tr>
    </table>

    <p>View it at: <a href="http://thomaskbird.com/messages/{{ $contact['id'] }}">http://thomaskbird.com/messages/{{ $contact['id'] }}</a>, if the link doesn't work copy and paste the code</p>
</div>