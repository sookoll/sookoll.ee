/*
Title: Contact
Description: Web mapping done right.
Category: widget
Author: Mihkel Oviir
Date: 2015/08/01
Template: index
*/


<!--CONTACT-MESSAGE-->
<form method="post" name="contact">

    <!-- Input fields -->
    <div class="row">

        <fieldset class="form-group col-lg-6">
            <input type="text" name="name" class="form-control" placeholder="Name" required>
        </fieldset>

        <fieldset class="form-group col-lg-6">
            <input type="email" name="mail" class="form-control" placeholder="Email" required>
        </fieldset>

    </div>

    <!-- Message -->
    <fieldset class="form-group">
        <textarea class="form-control" name="message" rows="3" placeholder="Message" required></textarea>
    </fieldset>

    <!-- Submit -->
    <button type="submit" name="contact" value="true" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Send</button>
</form>