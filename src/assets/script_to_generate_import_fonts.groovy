import com.sap.gateway.ip.core.customdev.util.Message;
import java.util.HashMap;
import groovy.xml.*;

def Message processData(Message message) {
    def root = new XmlSlurper().parseText(message.getBody(String))

    // Generazione delle stringhe @import
    root.fonts.each { font ->
        def fontName = font.name.text()
        fontName = fontName.replaceAll(" ", "+")
        println "@import url('https://fonts.googleapis.com/css2?family=${fontName}&display=swap');"
    }
    return message
}