import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

function AboutSection({ formData, setFormData, isEditing }){
    return(
        <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {isEditing ? (
                    <>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bio: e.target.value.slice(0, 300),
                          })
                        }
                        placeholder="Tell others about yourself or your organization..."
                        rows={3}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.bio.length}/300
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      {formData.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
    )
}

export default AboutSection;